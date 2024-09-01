import mongoose from "mongoose";

const profileFileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});
const ProfileFile = mongoose.model("ProfileFile", profileFileSchema);
export default ProfileFile;
