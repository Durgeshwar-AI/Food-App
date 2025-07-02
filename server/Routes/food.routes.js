import express from "express"
import { addFood, deleteFood, getAllFood, updateFood } from "../Controllers/food.controller.js";

const router = express.Router();

router.get("/getFood",getAllFood)

router.post("/addFood",addFood)

router.delete("/deleteFood",deleteFood)

router.patch("/updateFood",updateFood)

export default router