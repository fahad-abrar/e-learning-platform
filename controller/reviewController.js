import Review from "../model/reviewModel.js";
import Course from "../model/courseModel.js";
import ErrorHandler from "../errorHandler/errorHandler.js";

class ReviewController {
  static async createReview(req, res, next) {
    try {
      // retrieved info from the req body
      const { review, rating } = req.body;
      if (!review && !rating) {
        return next(new ErrorHandler("at least one field is required", 400));
      }

      // validate rating if provided
      if (rating && (rating < 1 || rating > 5)) {
        return next(new ErrorHandler("rating must be between 1 and 5", 400));
      }

      // check if the course is exist or not
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      //setup a review skeleton
      const reviewSkeleton = {
        userId: req.user.id,
        topicId: id,
        review,
        rating,
      };

      // store the info in the course file
      const newreview = await Review.create(reviewSkeleton);
      newreview.courseId = id;
      await newreview.save();

      //push the review to cource file
      course.reviews.push(newreview);

      // reclaculate the avg rating
      const totalRating = course.reviews.reduce((acc, itm) => {
        return (acc += parseInt(itm.rating));
      }, 0);

      course.ratings = totalRating / course.reviews.length;
      await course.save();

      // send the response
      return res.status(201).json({
        success: true,
        message: "review is created",
        review: newreview,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async updateReview(req, res, next) {
    try {
      const info = req.body;

      // check if the review is exist or not
      const { rid, cid } = req.params;
      const review = await Review.findById(rid);
      if (!review) {
        return next(new ErrorHandler("review is not found", 404));
      }

      // check if the course is exist or not
      const course = await Course.findById(cid);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      // update the review
      const updateInfo = await Review.findByIdAndUpdate(rid, info, {
        new: true,
      });

      // replace the old review with the updated one
      const reviewIndex = course.reviews.findIndex(
        (rev) => rev._id.toString() === rid
      );

      if (reviewIndex !== -1) {
        course.reviews[reviewIndex] = updateInfo;
      } else {
        course.reviews.push(updatedReview);
      }

      // reclaculate the avg rating
      const totalRating = course.reviews.reduce((acc, rev) => {
        return (acc += parseInt(rev.rating));
      }, 0);

      course.ratings = totalRating / course.reviews.length;
      await course.save();

      // send the response
      return res.status(201).json({
        success: true,
        message: "review is updated",
        review: updateInfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const { rid, cid } = req.params;

      // check if the review is exist or not
      const review = await Review.findById(rid);
      if (!review) {
        return next(new ErrorHandler("review is not found", 404));
      }

      // find the course
      const course = await Course.findById(cid);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      // remove the deleted review from the course data
      course.reviews = course?.reviews.filter((rev) => {
        return rev._id.toString() !== rid;
      });

      //save the course data
      await course.save();

      // delete the review
      const deleteinfo = await Review.findByIdAndDelete(rid);

      // send the response
      return res.status(201).json({
        success: true,
        message: "review is deleted",
        review: deleteinfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getAllReview(req, res, next) {
    try {
      // check if the review is exist or not
      const review = await Review.find();
      if (!review) {
        return next(new ErrorHandler("review is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "review is retrieved",
        review,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getSingleReview(req, res, next) {
    try {
      // check if the review is exist or not
      const { id } = req.params;
      const review = await Review.findById(id);
      if (!review) {
        return next(new ErrorHandler("review is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: "review is retrieved",
        review,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}

export default ReviewController;
