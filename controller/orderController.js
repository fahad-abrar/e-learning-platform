import Order from "../model/orderModel.js";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";
import ErrorHandler from "../errorHandler/errorHandler.js";
import Notification from "../model/notificationModel.js";

class OrderController {
  static async create(req, res, next) {
    try {
      // retrieved data from request body
      const { paymentInfo } = req.body;

      // check if the course is exist or not
      const { courseId } = req.params;
      const course = await Course.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("course is not found", 404));
      }

      // find the auth user
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(
          new ErrorHandler("register is required  to place the order", 404)
        );
      }

      const userPurchaseList = user.courses.map((itm) => {
        return itm._id?.toString();
      });

      // check if the user has already purchase this course or not

      if (userPurchaseList.includes(courseId)) {
        return next(new ErrorHandler("course has already purchased", 404));
      }

      // set the order skeleton
      const orderSkeleton = {
        userId: req.user.id,
        courseId,
        paymentInfo,
      };

      // store the order in order database
      const order = await Order.create(orderSkeleton);

      // push the course id to the user info
      user.courses.push(courseId);
      await user.save();

      // set up the notification skeleton
      const notificationSkeleton = {
        userId: req.user.id,
        title: "new order is placed",
        message: `${user.name} is placed a order for purchasing ${course.name}`,
      };
      //send the notification to admin
      const notification = await Notification.create(notificationSkeleton);

      return res.status(201).json({
        success: true,
        message: "order is created",
        notification,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
}

export default OrderController;
