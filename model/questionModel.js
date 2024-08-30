import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
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
      type: String,
      required: false,
    },
  ],
});
const Question = mongoose.model("Question", questionSchema);
export default Question;
