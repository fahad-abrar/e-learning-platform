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
    comment: {
      type: String,
      required: false,
    },
    replies: [
      {
        userId: {
          type: String,
          required: false,
        },
        reply: {
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
