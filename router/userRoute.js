import express from "express";
import UserController from "../controller/userController.js";
import ProfileController from "../controller/profileFileController.js";
import catchAsync from "../errorHandler/catchAsync.js";
import isAuthenticate from "../middleware/authUser.js";
import fileUpload from "../helper/multerFleUploader.js";
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

userRoute.put(
  "/update",
  isAuthenticate,
  catchAsync(UserController.updateUserInfo)
);
userRoute.post("/social-auth", catchAsync(UserController.socialAuth));
userRoute.post(
  "/change-password",
  isAuthenticate,
  catchAsync(UserController.updatePassword)
);

userRoute.post(
  "/avatar",
  isAuthenticate,
  fileUpload().single("avatar"),
  catchAsync(ProfileController.uploadAvatar)
);

export default userRoute;
