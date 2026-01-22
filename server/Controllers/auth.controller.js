import User from "../Models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { sendOtp, verifyOtp } from "../Services/otpService.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, email, password, phone, otp } = req.body;

  try {
    if (!otp || String(otp).trim().length === 0) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Verify OTP before creating account
    const otpResult = verifyOtp(email, String(otp).trim());
    if (!otpResult.success) {
      return res
        .status(400)
        .json({ message: otpResult.message || "Invalid OTP" });
    }

    password = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password,
      phone,
      refreshToken: null,
    });

    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ token, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    const name = user.name;

    user.refreshToken = refreshToken;
    await user.save();

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ token, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ token: newAccessToken, name: user.name });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Logout: clear refresh token cookie and invalidate stored refresh token
export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_JWT_SECRET);
        // Invalidate the refresh token stored for the user
        await User.findByIdAndUpdate(decoded._id, {
          $set: { refreshToken: null },
        });
      } catch (err) {
        // If token is invalid/expired, still proceed to clear cookie
      }
    }

    // Clear the cookie (options must match those used when setting it)
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to logout" });
  }
};

export const otpSending = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email || String(email).trim().length === 0) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await User.findOne({
      email: String(email).trim().toLowerCase(),
    });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await sendOtp(email);
    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

export const otpverification = (req, res) => {
  const { email, otp } = req.body;
  const result = verifyOtp(email, otp);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
};

export const pingUser = async (req, res) => {
  try {
    const refresh = req.cookies?.refreshToken;

    if (refresh) {
      try {
        const decoded = jwt.verify(refresh, process.env.REFRESH_JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user || user.refreshToken !== refresh) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "15m",
          },
        );

        const newRefreshToken = user.generateRefreshToken();
        user.refreshToken = newRefreshToken;
        await user.save();

        const isProd = process.env.NODE_ENV === "production";
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ token: newAccessToken, name: user.name });
      } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    }

    // Fallback: accept access token from Authorization header
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const access = authHeader.substring(7);
      try {
        const decoded = jwt.verify(access, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const token = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();
        const isProd = process.env.NODE_ENV === "production";

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "none" : "lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ token, name: user.name });
      } catch (err) {
        return res.status(401).json({ message: "Invalid access token" });
      }
    }

    return res.status(401).json({ message: "No valid token provided" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
