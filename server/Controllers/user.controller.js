import User from "../Models/user.model.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, phone } = req.body;
  const { firstname, lastname } = fullname || {};

  try {
    const existingUser = await Userser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    password = await bcrypt.hash(password,10)

    const user = new User({
      fullname: { firstname, lastname },
      email,
      password,
      phone,
    });

    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ token, firstname, email, phone });
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
    const firstname = user.fullname.firstname;
    res.status(200).json({ token, firstname, email: user.email, type: "user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
