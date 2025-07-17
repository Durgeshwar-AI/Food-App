import express from "express";
import * as cartController from "../Controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Get cart for current user
router.get("/", verifyToken, cartController.getCart);

// Add/update item in cart
router.post("/", verifyToken, cartController.addOrUpdateItem);

// Remove item from cart
router.delete("/:id", verifyToken, cartController.removeItem);

export default router;
