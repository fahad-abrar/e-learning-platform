import Topic from "../model/topicsModel.js";
import Course from "../model/courseModel.js";
import ErrorHandler from "../errorHandler/errorHandler.js";

class TopicController {
  static async createTopic(req, res, next) {
    try {
      // retrieved the info from the request body
      const topicDetails = req.body;

      // check if the cource is exist or not
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      // check if title and description are provided or not
      const { title, description } = req.body;
      if (!title || !description) {
        return next(
          new ErrorHandler(
            "course title description and content file is required",
            404
          )
        );
      }

      // ******************************
      // add file upload fuctionality
      // ******************************

      //store the topic in the topic database
      const topic = await Topic.create(topicDetails);

      //push the topic in the course file
      course.courseData.push(topic._id);
      await course.save();

      return res.status(201).json({
        success: true,
        message: " topic is created",
        topic,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async updateTopic(req, res, next) {
    try {
      // retrieved the info from the request body
      const updateInfo = req.body;
      const { id } = req.params;

      // check if the topic is exist or not
      const topic = await Topic.findById(id);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }

      // ******************************
      // add file upload fuctionality
      // ******************************

      //store the topic in the topic database

      // update and save the topic
      const updatedOne = await Topic.findByIdAndUpdate(id, updateInfo, {
        new: true,
      });

      // send the response
      return res.status(201).json({
        success: true,
        message: " topic is updated",
        updatedOne,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async deleteTopic(req, res, next) {
    try {
      const { id } = req.params;

      // check if the topic is exist or not
      const topic = await Topic.findById(id);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }
      // find the course
      const course = await Course.find();
      console.log("course data ==>>", course.courseData);

      // delete the topic
      const deletedOne = await Topic.deleteOne({ id });

      // send the response
      return res.status(201).json({
        success: true,
        message: " topic is updated",
        deletedtopic,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getSingleTopic(req, res, next) {
    try {
      // check if the topic is exist or not
      const { id } = req.params;
      const topic = await Topic.findById(id);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: " topic is updated",
        topic,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

  static async getAllTopic(req, res, next) {
    try {
      // get all the topic
      const topics = await Topic.find();
      if (!topics) {
        return next(new ErrorHandler("topics are not found", 404));
      }

      // send the response
      return res.status(201).json({
        success: true,
        message: " topic is updated",
        topics,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}

export default TopicController;
