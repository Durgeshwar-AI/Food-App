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
import Razorpay from "razorpay";
import { adminRegister } from "./Controllers/admin.controller.js";

configDotenv();

const PORT = process.env.PORT || 8000;
const app = express();

// ✅ REQUIRED FOR RENDER / HTTPS COOKIES
app.set("trust proxy", 1);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const allowedOrigins = [process.env.CORS_APPROVED];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Logger
app.use(morgan("tiny"));

// Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Routes
app.use("/api/admin", admin);
app.use("/api/user", userRegister);
app.use("/api/order", order);
app.use("/api/food", food);
app.use("/api/cart", cart);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server
const connection = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    if (process.env.NODE_ENV !== "production") {
      await adminRegister();
    }
  } catch (err) {
    console.log(err);
  }
};

connection();
