import mongoose from "mongoose";

const topicFileSchema = new mongoose.Schema({
  topicId: {
    type: String,
    required: true,
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
});
const TopicFile = mongoose.model("TopicFile", topicFileSchema);
export default TopicFile;
