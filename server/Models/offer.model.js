import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
