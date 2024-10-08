import express from "express";
import TopicFileController from "../controller/topicFileController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
import fileUpload from "../helper/multerFleUploader.js";
const topicFileRoute = express.Router();

topicFileRoute.post(
  "/upload/:id",
  isAuthenticate,
  fileUpload().single("vedio"),
  catchAsync(TopicFileController.createFile)
);

topicFileRoute.delete(
  "/delete/:vid/:tid",
  isAuthenticate,
  catchAsync(TopicFileController.deleteFile)
);
topicFileRoute.get(
  "/all",
  isAuthenticate,
  catchAsync(TopicFileController.getAllFile)
);
topicFileRoute.get(
  "/single/:id",
  isAuthenticate,
  catchAsync(TopicFileController.getSingleFile)
);

export default topicFileRoute;
