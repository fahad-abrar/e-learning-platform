import express from "express";
import UserController from "../controller/userController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
const userRoute = express.Router();

// user route ---
userRoute.post("/registration", catchAsync(UserController.userRegistration));
userRoute.post("/create", catchAsync(UserController.userCreate));
userRoute.post("/login", catchAsync(UserController.userLogIn));
userRoute.get("/logout", isAuthenticate, catchAsync(UserController.userLogout));
userRoute.get("/all", isAuthenticate, catchAsync(UserController.getUser));
userRoute.get("/me", isAuthenticate, catchAsync(UserController.getUserById));
userRoute.get(
  "/updatetoken",
  isAuthenticate,
  catchAsync(UserController.updatetokens)
);

export default userRoute;
