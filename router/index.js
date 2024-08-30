import express from "express";
import userRoute from "./userRoute.js";
import courseRoute from "./courseRoute.js";
import orderRoute from "./orderRoute.js";
const router = express.Router();

// user route --
router.use("/user", userRoute);
router.use("/course", courseRoute);
router.use("/order", orderRoute);

export default router;
