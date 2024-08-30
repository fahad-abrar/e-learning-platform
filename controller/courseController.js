import ErrorHandler from "../errorHandler/errorHandler.js";
import Course from "../model/courseModel.js";

class CourseController {
  static async create(req, res, next) {
    try {
      // retrieved all the info from the request body
      const data = req.body;

      // store the course info in data base
      const course = await Course.create(data);

      // return the response
      return res.status(201).json({
        success: true,
        message: " course is created",
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
}

export default CourseController;
