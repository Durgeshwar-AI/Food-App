import { Router } from "express";
import { body } from "express-validator";
import {
  adminLogin,
  adminRefreshToken,
  pingAdmin,
} from "../Controllers/admin.controller.js";

const router = Router();

const adminLoginValidation = [
  body("email").notEmpty().withMessage("Email is required.").trim(),
  body("password").notEmpty().withMessage("Password is required.").trim(),
];

router.post("/login", adminLoginValidation, adminLogin);
router.get("/refreshToken", adminRefreshToken);
router.get("/ping", pingAdmin);

export default router;
