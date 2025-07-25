import express from "express";
import { newOrder, orderCanceled, orderDelivered } from "../Controllers/order.controller.js";
const Router = express.Router();

Router.post("/new",newOrder);
Router.put("/deliverd",orderDelivered)
Router.put('/cancelOrder',orderCanceled)

export default Router