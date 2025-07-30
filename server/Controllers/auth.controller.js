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

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ name });
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
    const name = user.name;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
