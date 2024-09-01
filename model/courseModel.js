import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: false,
    },

    thumbnail: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: false,
    },
    demoUrl: {
      type: String,
      required: false,
    },
    benefits: {
      type: String,
      required: false,
    },
    prerequisites: {
      type: String,
      required: false,
    },
    reviews: [],
    courseData: [],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
