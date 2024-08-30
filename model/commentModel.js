import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    topicId: {
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
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
