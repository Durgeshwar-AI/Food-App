import express from "express";
import { newOrder, orderDelivered } from "../Controllers/order.controller.js";
const Router = express.Router();

Router.get("/new",newOrder);
Router.put("/deliverd",orderDelivered)
Router.put('/cancelOrder',orderCanceled)

export default Router