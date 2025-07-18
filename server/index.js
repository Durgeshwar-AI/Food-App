import express from "express";
import { configDotenv } from "dotenv";
import userRegister from "./Routes/user.routes.js";
import order from "./Routes/order.routes.js";
import food from "./Routes/food.routes.js";
import cart from "./Routes/cart.routes.js";
import connectDB from "./DB/db.js";
import cors from "cors";
import helmet from 'helmet'
import morgan from "morgan";

configDotenv();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet())
morgan('tiny')

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
  } catch (err) {
    console.log(err);
  }
};
connection();
