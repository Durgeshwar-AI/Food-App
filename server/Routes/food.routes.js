import express from "express";
import {
  addFood,
  deleteFood,
  getAllFood,
  getPopularFood,
  updateFood,
  searchFood,
} from "../Controllers/food.controller.js";

const router = express.Router();

router.get("/getFood", getAllFood);
router.get("/popular", getPopularFood);
router.get("/search", searchFood);

router.post("/addFood", addFood);

router.delete("/deleteFood/:id", deleteFood);

router.patch("/updateFood/:id", updateFood);

export default router;
