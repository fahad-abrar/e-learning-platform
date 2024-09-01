import express from "express";
import CourseController from "../controller/courseController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const courseRoute = express.Router();

courseRoute.post(
  "/create",
  isAuthenticate,
  catchAsync(CourseController.createCourse)
);
courseRoute.put(
  "/update/:id",
  isAuthenticate,
  catchAsync(CourseController.updateCourse)
);
courseRoute.delete(
  "/delete/:id",
  isAuthenticate,
  catchAsync(CourseController.deleteCourse)
);
courseRoute.get(
  "/all",
  isAuthenticate,
  catchAsync(CourseController.getAllCourse)
);

courseRoute.get(
  "/single/:id",
  isAuthenticate,
  catchAsync(CourseController.getSingleCourse)
);

export default courseRoute;
