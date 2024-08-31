import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    thumbnil: {
      public_id: {
        type: String,
        required: false,
      },
      URL: {
        type: String,
        required: false,
      },
    },
    vedio: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    userId: {
      type: String,
      required: false,
    },
    courseId: {
      type: String,
      required: false,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    review: [],
    comment: [],
  },
  { timestamps: true }
);
const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
