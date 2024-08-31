import express from "express";
import ReplyController from "../controller/replyController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const replyRoute = express.Router();

replyRoute.post(
  "/create/:id",
  isAuthenticate,
  catchAsync(ReplyController.createReply)
);
replyRoute.put(
  "/update/:id",
  isAuthenticate,
  catchAsync(ReplyController.updateReply)
);
replyRoute.delete(
  "/delete/:rid/:cid",
  isAuthenticate,
  catchAsync(ReplyController.deleteReply)
);
replyRoute.get("/all", isAuthenticate, catchAsync(ReplyController.getAllReply));
replyRoute.get(
  "/single/:id",
  isAuthenticate,
  catchAsync(ReplyController.getSingleReply)
);

export default replyRoute;
