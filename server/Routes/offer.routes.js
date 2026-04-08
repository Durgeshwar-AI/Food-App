import express from "express";
import {
  addOffer,
  deleteOffer,
  getAllOffers,
  updateOffer,
  validateCoupon,
} from "../Controllers/offer.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/all", getAllOffers);
router.get("/validate/:code", validateCoupon);
router.post("/add", verifyAdmin, addOffer);
router.patch("/update/:id", verifyAdmin, updateOffer);
router.delete("/delete/:id", verifyAdmin, deleteOffer);

export default router;
