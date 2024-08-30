import express from "express";
import CommenController from "../controller/commentController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const commentRoute = express.Router();

commentRoute.post(
  "/create/:id",
  isAuthenticate,
  catchAsync(CommenController.createComment)
);
commentRoute.put(
  "/update/:id",
  isAuthenticate,
  catchAsync(CommenController.updateComment)
);
commentRoute.delete(
  "/delete/:cid/:tid",
  isAuthenticate,
  catchAsync(CommenController.deleteComment)
);
commentRoute.get(
  "/all",
  isAuthenticate,
  catchAsync(CommenController.getAllComment)
);
commentRoute.get(
  "/single/:id",
  isAuthenticate,
  catchAsync(CommenController.getSingleComment)
);

export default commentRoute;
