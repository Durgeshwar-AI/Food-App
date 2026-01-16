import express from "express";
import { configDotenv } from "dotenv";
import admin from "./Routes/admin.routes.js";
import userRegister from "./Routes/user.routes.js";
import order from "./Routes/order.routes.js";
import food from "./Routes/food.routes.js";
import cart from "./Routes/cart.routes.js";
import connectDB from "./DB/db.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import Razorpay from "razorpay";
import { adminRegister } from "./Controllers/admin.controller.js";

configDotenv();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_APPROVED,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
// app.use(csurf({ cookie: true }));
morgan("tiny");
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // from Razorpay dashboard (Test Mode)
  key_secret: process.env.RAZORPAY_SECRET, // from Razorpay dashboard (Test Mode)
});

app.use("/api/admin", admin);

app.use("/api/user", userRegister);
app.use("/api/order", order);
app.use("/api/food", food);
app.use("/api/cart", cart);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const connection = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    await adminRegister();
  } catch (err) {
    console.log(err);
  }
};
connection();
