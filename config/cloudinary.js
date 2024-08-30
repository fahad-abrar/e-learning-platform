import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../errorHandler/errorHandler";

const uploadOnCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  } catch (error) {
    return next(new ErrorHandler("upload failed on cloudinary", 400));
  }
};
export default uploadOnCloudinary;
