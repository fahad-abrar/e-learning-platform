import Comment from "../model/commentModel.js";
import Topic from "../model/topicsModel.js";
import ErrorHandler from "../errorHandler/errorHandler.js";

class CommentController {
  static async createComment(req, res, next) {
    try {
      // retrieved info from the req body
      const { question } = req.body;
      if (!question) {
        return next(new ErrorHandler("all the field is required", 404));
      }

      // check if the topic is exist or not
      const { id } = req.params;
      const topic = await Topic.findById(id);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }

      //setup a comment skeleton
      const commentSkeleton = {
        userId: req.user.id,
        topicId: id,
        question,
      };

      // store the info in the comment file
      const comment = await Comment.create(commentSkeleton);

      //push the comment to topic file
      topic.comment.push(comment);
      await topic.save();

      // send the response
      return res.status(201).json({
        success: true,
        message: "comment is created",
        comment,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async updateComment(req, res, next) {
    try {
      const info = req.body;

      // check if the comment is exist or not
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return next(new ErrorHandler("comment is not found", 404));
      }

      // update the comment
      const updateinfo = await Comment.findByIdAndUpdate(id, info, {
        new: true,
      });

      // send the response
      return res.status(201).json({
        success: true,
        message: "comment is created",
        comment: updateinfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { tid, cid } = req.params;

      // check if the comment is exist or not
      const comment = await Comment.findById(cid);
      if (!comment) {
        return next(new ErrorHandler("comment is not found", 404));
      }

      // find the topic
      const topic = await Topic.findById(tid);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }

      // remove the deleted topic from the course data
      topic.comment = topic?.comment.filter((itm) => {
        return itm._id.toString() !== cid;
      });

      //save the course data
      await topic.save();

      // delete the comment
      const deleteinfo = await Comment.findByIdAndDelete(cid);

      // send the response
      return res.status(201).json({
        success: true,
        message: "comment is deleted",
        comment: deleteinfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getAllComment(req, res, next) {
    try {
      // check if the comment is exist or not
      const comment = await Comment.find();
      if (!comment) {
        return next(new ErrorHandler("comment is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "comment is retrieved",
        comment,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getSingleComment(req, res, next) {
    try {
      // check if the comment is exist or not
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return next(new ErrorHandler("comment is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "comment is retrieved",
        comment,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}

export default CommentController;
