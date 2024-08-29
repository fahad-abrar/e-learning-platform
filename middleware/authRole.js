import ErrorHandler from "../errorHandler/errorHandler.js";

const isAuthorizedRole = (...role) => {
  try {
    return (req, res, next) => {
      if (!role.includes(req.user?.role || "")) {
        return next(new ErrorHandler("user is not authorized to do this", 400));
      }
    };
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
export default isAuthorizedRole;
