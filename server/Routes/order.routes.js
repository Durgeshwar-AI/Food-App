import express from "express";
import { newOrder, orderCanceled, orderDelivered, orderHistory } from "../Controllers/order.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const Router = express.Router();

Router.get("/history",verifyToken,orderHistory)
Router.post("/new",verifyToken,newOrder);
Router.put("/deliverd",verifyToken,orderDelivered)
Router.put('/cancelOrder',verifyToken,orderCanceled)

export default Router