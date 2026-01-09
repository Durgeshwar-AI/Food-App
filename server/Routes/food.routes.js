import express from "express";
import {
  addFood,
  deleteFood,
  getAllFood,
  getPopularFood,
  updateFood,
  searchFood,
} from "../Controllers/food.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/getFood", getAllFood);
router.get("/popular", getPopularFood);
router.get("/search", searchFood);

router.post("/addFood", verifyAdmin, addFood);

router.delete("/deleteFood/:id", verifyAdmin, deleteFood);

router.patch("/updateFood/:id", verifyAdmin, updateFood);

export default router;
