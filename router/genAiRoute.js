import express from "express";
import genAiController from "../gemini/geminiAi.js";
import isAuthenticate from "../middleware/authUser.js";
const genRoute = express.Router();

genRoute.post("/", isAuthenticate, genAiController);

export default genRoute;
