import express from "express";
import { loginUser, registerUser } from "../Controllers/auth.controller.js";
import { body } from "express-validator";
import authenticateUser from "../middlewares/authenticateUser.js";
import { updateProfile } from "../Controllers/user.controller.js";
const router = express.Router();

const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters.")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should contain only letters and spaces."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .trim()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      "Password must include an uppercase letter, number, and special character."
    ),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number."),
];

const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .trim(),
  body("password").notEmpty().withMessage("Password is required.").trim(),
];

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.put('/updateProfile',authenticateUser,updateProfile)

export default router;
