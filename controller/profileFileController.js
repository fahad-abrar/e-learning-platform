import ProfileFile from "../model/profileFileModel.js";
import User from "../model/userModel.js";
import ErrorHandler from "../errorHandler/errorHandler.js";

class ProfileController {
  static async uploadAvatar(req, res, next) {
    try {
      // check if the topic is exist or not
      const { id } = req.user;
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHandler("user is not found", 404));
      }

      //check if the req body contain file or not
      if (!req.file) {
        return next(new ErrorHandler("avatar file is not found", 404));
      }

      // set up a skeleton to strore the file
      const avatar = {
        public_id: req.file.filename,
        url: req.file.path,
      };

      //  sent and save the file in the user file
      user.avatar = avatar;
      await user.save();

      // send the response
      return res.status(201).json({
        success: true,
        message: "avatar is uploaded",
        avatar,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}
export default ProfileController;
