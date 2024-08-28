import express from "express";
import userRoute from "./userRoute.js";
const router = express.Router();

// user route --
router.use("/user", userRoute);

export default router;
