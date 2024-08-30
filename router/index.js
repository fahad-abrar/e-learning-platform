import express from "express";
import userRoute from "./userRoute.js";
import courseRoute from "./courseRoute.js";
import orderRoute from "./orderRoute.js";
import topicRoute from "./topicRouter.js";
import commentRoute from "./commentRoute.js";
const router = express.Router();

// user route --
router.use("/user", userRoute);
router.use("/course", courseRoute);
router.use("/order", orderRoute);
router.use("/topic", topicRoute);
router.use("/comment", commentRoute);

export default router;
