import jwt from "jsonwebtoken";

// Middleware to verify JWT and set req.userId
export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  }
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
import User from "../Models/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

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

    const user = new User({
      name,
      email,
      password,
      phone,
    });

    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ token, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
    const name = user.name;
    res.status(200).json({ token, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
