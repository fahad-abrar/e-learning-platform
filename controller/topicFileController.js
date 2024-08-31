import TopicFile from "../model/topicFileModel.js";
import Topic from "../model/topicsModel.js";

import ErrorHandler from "../errorHandler/errorHandler.js";

class TopicFileController {
  static async createFile(req, res, next) {
    try {
      // check if the topic is exist or not
      const { id } = req.params;
      const topic = await Topic.findById(id);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }

      //check if the req body contain file or not
      if (!req.file) {
        return next(new ErrorHandler("upload vedio is not found", 404));
      }

      // set up a skeleton to strore the file
      const vedio = {
        public_id: req.file.filename,
        url: req.file.path,
      };

      const fileSkeleton = {
        topicId: id,
        vedio,
      };

      // sote the vedio in the file
      const vedioFile = await TopicFile.create(fileSkeleton);

      //  sent and save the file in the related topics
      topic.vedio = vedio;
      await topic.save();

      // send the response
      return res.status(201).json({
        success: true,
        message: "file is uploaded",
        vedio: vedioFile,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async deleteFile(req, res, next) {
    try {
      // check if the topic is exist or not
      const { vid, tid } = req.params;
      const topic = await Topic.findById(tid);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }
      // check if the vedio is exist or not
      const vedio = await TopicFile.findById(vid);
      if (!vedio) {
        return next(new ErrorHandler("vedio is not found", 404));
      }

      // delete from the  data base
      const deleteOne = await TopicFile.findByIdAndDelete(vid);

      // remove from the topic
      topic.vedio = null;
      await topic.save();

      //send the response
      return res.status(201).json({
        success: true,
        message: "vedio is deleted",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getAllFile(req, res, next) {
    try {
      // check if the vedio is exist or not
      const vedio = await TopicFile.find();
      if (!vedio) {
        return next(new ErrorHandler("vedio is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "vedio is retrieved",
        vedio,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getSingleFile(req, res, next) {
    try {
      // check if the topic is exist or not
      const { id } = req.params;
      const vedio = await TopicFile.findById(id);
      if (!vedio) {
        return next(new ErrorHandler("vedio is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "vedio is retrieved",
        vedio,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}

export default TopicFileController;
