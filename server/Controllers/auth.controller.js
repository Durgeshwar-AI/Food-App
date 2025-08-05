import User from "../Models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { sendOtp, verifyOtp } from "../Services/otpService.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    password = await bcrypt.hash(password, 10);
    
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    const user = new User({
      name,
      email,
      password,
      phone,
      refreshToken
    });

    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({token, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = (req,res) =>{
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { _id: decoded._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const user = User.findOne({_id});

    res.json({ token: newAccessToken, name: user.name });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
}

export const otpSending = async (req, res) => {
  const { email } = req.body;
  try {
    await sendOtp(email);
    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
}

export const otpverification = (req, res) => {
  const { email, otp } = req.body;
  const result = verifyOtp(email, otp);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
}