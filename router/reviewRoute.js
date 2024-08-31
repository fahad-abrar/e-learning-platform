import express from "express";
import ReviewController from "../controller/reviewController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const reviewRoute = express.Router();

reviewRoute.post(
  "/create/:id",
  isAuthenticate,
  catchAsync(ReviewController.createReview)
);
reviewRoute.put(
  "/update/:rid/:cid",
  isAuthenticate,
  catchAsync(ReviewController.updateReview)
);
reviewRoute.delete(
  "/delete/:rid/:cid",
  isAuthenticate,
  catchAsync(ReviewController.deleteReview)
);
reviewRoute.get(
  "/all",
  isAuthenticate,
  catchAsync(ReviewController.getAllReview)
);
reviewRoute.get(
  "/single/:id",
  isAuthenticate,
  catchAsync(ReviewController.getSingleReview)
);

export default reviewRoute;
