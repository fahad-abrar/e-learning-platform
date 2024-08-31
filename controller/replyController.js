import Reply from "../model/replyModel.js";
import Comment from "../model/commentModel.js";
import ErrorHandler from "../errorHandler/errorHandler.js";

class ReplyController {
  static async createReply(req, res, next) {
    try {
      // retrieve info form the req body
      const { reply } = req.body;

      // check if the req comment is exist or not
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return next(new ErrorHandler("comment is not found", 404));
      }
      // check if the req body got reply
      if (!reply) {
        return next(new ErrorHandler("reply field is required", 404));
      }

      // store the reply
      const newReply = await Reply.create({
        userId: req.user.id,
        commentId: id,
        reply,
      });

      // push and save the reply
      comment.replies.push(newReply);
      await comment.save();

      //send the response
      return res.status(201).json({
        success: true,
        message: "reply is created",
        reply: newReply,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async updateReply(req, res, next) {
    try {
      const info = req.body;

      // check if the reply is exist or not
      const { id } = req.params;
      const reply = await Reply.findById(id);
      if (!reply) {
        return next(new ErrorHandler("reply is not found", 404));
      }

      // update the reply
      const updateinfo = await Reply.findByIdAndUpdate(id, info, {
        new: true,
      });

      // send the response
      return res.status(201).json({
        success: true,
        message: "reply is created",
        reply: updateinfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async deleteReply(req, res, next) {
    try {
      const { rid, cid } = req.params;

      // check if the comment is exist or not
      const comment = await Comment.findById(cid);
      if (!comment) {
        return next(new ErrorHandler("comment is not found", 404));
      }

      // find the reply
      const reply = await Reply.findById(rid);
      if (!reply) {
        return next(new ErrorHandler("reply is not found", 404));
      }

      // remove the deleted reply from the comment
      comment.replies = comment?.replies.filter((itm) => {
        return itm._id.toString() !== rid;
      });

      //save the course data
      await comment.save();

      // delete the reply
      const deleteinfo = await Reply.findByIdAndDelete(rid);

      // send the response
      return res.status(201).json({
        success: true,
        message: "reply is deleted",
        reply: deleteinfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getAllReply(req, res, next) {
    try {
      // check if the reply is exist or not
      const reply = await Reply.find();
      if (!reply) {
        return next(new ErrorHandler("reply is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "reply is retrieved",
        reply,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getSingleReply(req, res, next) {
    try {
      // check if the reply is exist or not
      const { id } = req.params;
      const reply = await Reply.findById(id);
      if (!reply) {
        return next(new ErrorHandler("reply is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "reply is retrieved",
        reply,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}
export default ReplyController;
