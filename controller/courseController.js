import ErrorHandler from "../errorHandler/errorHandler.js";
import Course from "../model/courseModel.js";
import Review from "../model/reviewModel.js";
import Topic from "../model/topicsModel.js";

class CourseController {
  static async createCourse(req, res, next) {
    try {
      // retrieved all the info from the request body
      const data = req.body;

      //check if all the required info is provided or not
      const { title, description, tags } = req.body;
      if (!title || !description || !tags) {
        return next(
          new ErrorHandler(" title , description ans tag must be provided", 404)
        );
      }
      // store the course info in data base
      const course = await Course.create(data);

      // return the response
      return res.status(201).json({
        success: true,
        message: " course is created",
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async updateCourse(req, res, next) {
    try {
      //check if the course is exist or not
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      // retrieved all the info from the request body
      const updateInfo = req.body;

      // store the course info in data base
      const updateCourse = await Course.findByIdAndUpdate(id, updateInfo, {
        new: true,
      });

      // return the response
      return res.status(201).json({
        success: true,
        message: " course is updated",
        updateCourse,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async deleteCourse(req, res, next) {
    try {
      const { id } = req.params;

      // check if the course exists
      const course = await Course.findById(id);
      if (!course) {
        await session.abortTransaction();
        session.endSession();
        return next(new ErrorHandler("Course not found", 404));
      }

      // delete all related topics and reviews
      await Topic.deleteMany({ courseId: id });
      await Review.deleteMany({ courseId: id });

      // delete the course
      await Course.findByIdAndDelete(id);

      // send the respons
      return res.status(200).json({
        success: true,
        message: "course is deleted ",
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getAllCourse(req, res, next) {
    try {
      //check if the course is exist or not
      const course = await Course.find();
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }
      // return the response
      return res.status(201).json({
        success: true,
        message: "all courses are retrieved",
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getSingleCourse(req, res, next) {
    try {
      //check if the course is exist or not
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      // return the response
      return res.status(201).json({
        success: true,
        message: " course is retrieved",
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}

export default CourseController;
