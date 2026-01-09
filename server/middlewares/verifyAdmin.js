import jwt from "jsonwebtoken";

const ADMIN_REFRESH_COOKIE = "adminRefreshToken";

export const verifyAdmin = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === "admin") {
        req.admin = { email: decoded.email || null };
        return next();
      }
      // If not admin, fall through to refresh-token check
    } catch (err) {
      // Token invalid/expired; fall through to refresh-token logic
    }
  }

  const refresh = req.cookies?.[ADMIN_REFRESH_COOKIE];

  if (!refresh) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  try {
    const decoded = jwt.verify(refresh, process.env.REFRESH_JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Invalid admin refresh token" });
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

    req.admin = { email: decoded.email || null };
    req.adminNewToken = newAccessToken;

    return next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid admin refresh token" });
  }
};
