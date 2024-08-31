import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    commentId: {
      type: String,
      required: false,
    },
    reply: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Reply = mongoose.model("Reply", replySchema);

export default Reply;
