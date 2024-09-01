import express from "express";
import genAiController from "../gemini/geminiAi.js";
const genRoute = express.Router();

genRoute.post("/", genAiController);

export default genRoute;
