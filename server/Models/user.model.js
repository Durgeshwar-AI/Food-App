import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

// 🛒 Cart Item Schema
const CartItemSchema = new Schema({
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
}, { _id: false }); // _id false so each cart item doesn't get a unique _id

// 📦 Order History Schema (extends CartItemSchema)
const OrderHistorySchema = new Schema({
  ...CartItemSchema.obj,
  status: {
    type: String,
    required: true,
    default: "Ordered",
  }
}, { timestamps: true });

// 👤 User Schema
const UserSchema = new Schema({
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
  address: {
    type: String,
    default: "",
  },
  cart: {
    type: [CartItemSchema],
    default: [],
  },
  orders: {
    type: [OrderHistorySchema],
    default: [],
  },
  refreshToken:{
    type: String,
    required: true,
    default: null
  }
}, { timestamps: true });

// 🔐 Instance method to generate JWT
UserSchema.methods.generateAuthToken = function () {
  const payload = { _id: this._id, email: this.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};

UserSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id, email: this.email };
  return jwt.sign(payload, process.env.REFRESH_JWT_SECRET, { expiresIn: "30d" });
};

// 🔒 Hide password in toJSON
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// 📦 Create and export model
const User = model("User", UserSchema);
export default User;
