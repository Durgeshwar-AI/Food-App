import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT;

const app = express();
app.use("/api/user",)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
