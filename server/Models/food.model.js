import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  category:{
    type: String,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  timesOrdered:{
    type:Number,
    required: true,
    default: 0,
    min: 0
  }
});

// Helpful text index for faster search on common fields
foodSchema.index({ name: "text", description: "text", category: "text" });

const Food = new mongoose.model("food", foodSchema);

export default Food;
