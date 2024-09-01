import express from "express";
import TopicController from "../controller/topicsController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const topicRoute = express.Router();

topicRoute.post(
  "/create/:id",
  isAuthenticate,
  catchAsync(TopicController.createTopic)
);
topicRoute.put(
  "/update/:id",
  isAuthenticate,
  catchAsync(TopicController.updateTopic)
);
topicRoute.delete(
  "/delete/:cid/:tid",
  isAuthenticate,
  catchAsync(TopicController.deleteTopic)
);
topicRoute.get(
  "/single/:id",
  isAuthenticate,
  catchAsync(TopicController.getSingleTopic)
);
topicRoute.get("/all", isAuthenticate, catchAsync(TopicController.getAllTopic));

export default topicRoute;
