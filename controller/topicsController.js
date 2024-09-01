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

      //store the topic in the topic database
      const topic = await Topic.create(topicDetails);
      topic.courseId = id;
      await topic.save();

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
      const { cid, tid } = req.params;

      // check if the topic is exist or not
      const topic = await Topic.findById(tid);
      if (!topic) {
        return next(new ErrorHandler("topic is not found", 404));
      }
      console.log("topic==>>", topic);
      // find the course
      const course = await Course.findById(cid);
      console.log("course data ==>>", course.courseData.toString());

      // delete the topic
      const deletedOne = await Topic.findByIdAndDelete(tid);

      // remove the deleted topic from the course data
      course.courseData = course?.courseData.filter((id) => {
        return id.toString() !== tid;
      });

      //save the course data
      await course.save();

      console.log("id==>>", course.courseData);

      // send the response
      return res.status(201).json({
        success: true,
        message: " topic is deleted",
        deletedOne,
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
        message: "topis is retrieved",
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
        message: "topics are retrieved",
        topics,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
}

export default TopicController;
