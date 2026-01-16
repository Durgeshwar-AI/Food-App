import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../Models/admin.model.js";

const ADMIN_REFRESH_COOKIE = "adminRefreshToken";

/* =========================================================
   ADMIN REGISTER (ONE-TIME, ENV-BASED)
========================================================= */
export const adminRegister = async () => {
  try {
    const name = process.env.ADMIN_NAME || "Admin";
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log("ADMIN_EMAIL or ADMIN_PASSWORD not configured");
      return;
    }
    const existing = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existing) {
      console.log("Admin already registered");
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    console.log("Admin registered");
  } catch (error) {
    console.log(error)
  }
};

/* =========================================================
   ADMIN LOGIN
========================================================= */
export const adminLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Invalid")
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const accessToken = admin.generateAuthToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save();

    res.cookie(ADMIN_REFRESH_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      token: accessToken,
      role: admin.role,
      name: admin.name,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   REFRESH ACCESS TOKEN
========================================================= */
export const adminRefreshToken = async (req, res) => {
  const refreshToken = req.cookies?.[ADMIN_REFRESH_COOKIE];

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const admin = await Admin.findOne({
      _id: decoded._id,
      refreshToken,
    });

    if (!admin) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    const newAccessToken = admin.generateAuthToken();

    return res.status(200).json({
      token: newAccessToken,
      role: admin.role,
      name: admin.name,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

/* =========================================================
   PING ADMIN (SESSION KEEP-ALIVE)
========================================================= */
export const pingAdmin = async (req, res) => {
  try {
    const refreshToken = req.cookies?.[ADMIN_REFRESH_COOKIE];

    /* ---- Prefer refresh token ---- */
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const admin = await Admin.findOne({
        _id: decoded._id,
        refreshToken,
      });

      if (!admin) {
        return res.status(403).json({ message: "Session expired" });
      }

      const newAccessToken = admin.generateAuthToken();
      const newRefreshToken = admin.generateRefreshToken();

      admin.refreshToken = newRefreshToken;
      await admin.save();

      res.cookie(ADMIN_REFRESH_COOKIE, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        token: newAccessToken,
        role: admin.role,
        name: admin.name,
      });
    }

    /* ---- Fallback: access token ---- */
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({
      role: "admin",
      email: decoded.email,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* =========================================================
   LOGOUT
========================================================= */
export const adminLogout = async (req, res) => {
  const refreshToken = req.cookies?.[ADMIN_REFRESH_COOKIE];

  if (refreshToken) {
    await Admin.updateOne({ refreshToken }, { $set: { refreshToken: null } });
  }

  res.clearCookie(ADMIN_REFRESH_COOKIE, {
    httpOnly: true,
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
