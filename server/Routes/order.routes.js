import express from "express";
import { newOrder } from "../Controllers/order.controller.js";
const Router = express.Router();

Router.get("/new",newOrder);

export default Router