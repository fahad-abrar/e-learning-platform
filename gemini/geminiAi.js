import { GoogleGenerativeAI } from "@google/generative-ai";
import ErrorHandler from "../errorHandler/errorHandler.js";

const API_KEY = process.env.GEMINI_API_KEY;

const genAi = new GoogleGenerativeAI(API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generator = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const genAiController = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    // check if the prompt is provided or not
    if (!prompt) {
      return next(
        new ErrorHandler("say something, what you want to know ??", 404)
      );
    }

    // generat the text
    const answer = await generator(prompt);

    // send the response
    return res.status(200).json({
      success: true,
      message: "response the generator",
      answer,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export default genAiController;
