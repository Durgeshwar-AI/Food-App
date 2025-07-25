import express from "express";
import { newOrder, orderCanceled, orderDelivered, orderHistory } from "../Controllers/order.controller.js";
const Router = express.Router();

Router.get("/history",orderHistory)
Router.post("/new",newOrder);
Router.put("/deliverd",orderDelivered)
Router.put('/cancelOrder',orderCanceled)

export default Router