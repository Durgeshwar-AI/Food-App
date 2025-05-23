import express from "express";
import { configDotenv } from "dotenv";
import userRegister from "./Routes/user.routes.js";
import connectDB from "./DB/db.js";

configDotenv();

const PORT = process.env.PORT;

const app = express();
app.use("/api/user", userRegister);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const connection = async () => {
  try {
    await connectDB()
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
  } catch (err) {
    console.log(err);
  }
};
connection()