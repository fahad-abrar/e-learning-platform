import express from "express";
import CourseController from "../controller/courseController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const courseRoute = express.Router();

courseRoute.post("/create", catchAsync(CourseController.create));

export default courseRoute;
