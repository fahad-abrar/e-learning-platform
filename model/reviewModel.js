import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    courseId: {
      type: String,
      required: false,
    },
    review: {
      type: String,
      required: false,
    },
    rating: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
