import express from "express";
import UserController from "../controller/userController.js";
import catchAsync from "../errorHandler/catchAsync.js";
const userRoute = express.Router();

// user route ---
userRoute.post("/registration", catchAsync(UserController.userRegistration));
userRoute.post("/create", catchAsync(UserController.userCreate));

export default userRoute;
