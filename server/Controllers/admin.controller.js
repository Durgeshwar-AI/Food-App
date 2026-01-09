import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const ADMIN_REFRESH_COOKIE = "adminRefreshToken";

export const adminLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res
      .status(500)
      .json({ message: "Admin credentials are not configured" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  try {
    const accessToken = jwt.sign(
      { role: "admin", email: adminEmail },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { role: "admin", email: adminEmail },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie(ADMIN_REFRESH_COOKIE, refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      token: accessToken,
      role: "admin",
      name: "Admin",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const adminRefreshToken = (req, res) => {
  const refresh = req.cookies?.[ADMIN_REFRESH_COOKIE];

  if (!refresh) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refresh, process.env.REFRESH_JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { role: "admin", email: decoded.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      token: newAccessToken,
      role: "admin",
      name: "Admin",
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const pingAdmin = (req, res) => {
  try {
    const refresh = req.cookies?.[ADMIN_REFRESH_COOKIE];

    if (refresh) {
      try {
        const decoded = jwt.verify(refresh, process.env.REFRESH_JWT_SECRET);

        if (decoded.role !== "admin") {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
          { role: "admin", email: decoded.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "15m",
          }
        );

        const newRefreshToken = jwt.sign(
          { role: "admin", email: decoded.email },
          process.env.REFRESH_JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );

        res.cookie(ADMIN_REFRESH_COOKIE, newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });

        return res.status(200).json({
          token: newAccessToken,
          role: "admin",
          name: "Admin",
        });
      } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    }

    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const access = authHeader.substring(7);

      try {
        const decoded = jwt.verify(access, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const newAccessToken = jwt.sign(
          { role: "admin", email: decoded.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "15m",
          }
        );

        const newRefreshToken = jwt.sign(
          { role: "admin", email: decoded.email },
          process.env.REFRESH_JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );

        res.cookie(ADMIN_REFRESH_COOKIE, newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });

        return res.status(200).json({
          token: newAccessToken,
          role: "admin",
          name: "Admin",
        });
      } catch (err) {
        return res.status(401).json({ message: "Invalid access token" });
      }
    }

    return res.status(401).json({ message: "No valid token provided" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
