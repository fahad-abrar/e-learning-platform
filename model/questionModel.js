import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    courseId: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: false,
    },
    answer: [
      {
        userId: {
          type: String,
          required: false,
        },
        ans: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const Question = mongoose.model("Question", questionSchema);
export default Question;
