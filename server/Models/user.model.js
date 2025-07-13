const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const CartItemSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "food",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  cart: {
    type: [CartItemSchema],
    default: [],
  },
});

UserSchema.methods.generateAuthToken = function () {
  const payload = { _id: this._id, email: this.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
