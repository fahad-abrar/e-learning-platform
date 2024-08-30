import express from "express";
import TopicController from "../controller/topicsController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const topicRoute = express.Router();

topicRoute.post("/create/:id", catchAsync(TopicController.createTopic));
topicRoute.put("/update/:id", catchAsync(TopicController.updateTopic));
topicRoute.delete("/delete/:cid/:tid", catchAsync(TopicController.deleteTopic));
topicRoute.get("/single/:id", catchAsync(TopicController.getSingleTopic));
topicRoute.get("/all", catchAsync(TopicController.getAllTopic));

export default topicRoute;
