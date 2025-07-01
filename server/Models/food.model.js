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
  offer: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

const Food = new mongoose.model("food", foodSchema);

export default Food;
