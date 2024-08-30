import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  courseId: {
    type: String,
    required: false,
  },
  questionId: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: false,
  },
});
const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
