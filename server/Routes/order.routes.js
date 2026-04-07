import express from "express";
import {
  newOrder,
  orderCanceled,
  orderDelivered,
  orderHistory,
  getDashboardOrders,
  getDashboardStats,
  updateOrderStatus,
} from "../Controllers/order.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const Router = express.Router();

// User routes
Router.post("/new", verifyToken, newOrder);
Router.get("/history", verifyToken, orderHistory);

// Admin dashboard routes
Router.get("/all", verifyAdmin, getDashboardOrders);
Router.get("/stats", verifyAdmin, getDashboardStats);
Router.patch("/update-status/:id", verifyAdmin, updateOrderStatus);
Router.put("/delivered/:id", verifyAdmin, orderDelivered);
Router.put("/cancel/:id", verifyAdmin, orderCanceled);

export default Router;