import express from "express";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
import OrderController from "../controller/orderController.js";
const orderRoute = express.Router();

orderRoute.post(
  "/create/:courseId",
  isAuthenticate,
  catchAsync(OrderController.create)
);

export default orderRoute;
