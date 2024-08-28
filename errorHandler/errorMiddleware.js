import ErrorHandler from "./errorHandler.js";

const errerMiddlewere = (err, req, res, next) => {
  // set as default error
  err.message = err.message || "internal server error";
  err.statuscode = err.statuscode || 500;

  // another custom error
  if (err.name === "CastError") {
    const message = `resource not found, invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // jwt token error
  if (err.name === "JsonWebTokenError") {
    const message = "invalid json web token";
    err = new ErrorHandler(message, 400);
  }

  // jwt token expire error
  if (err.name === "TokenExpiredError") {
    const message = "jwt token is expired";
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // return the response
  return res.status(err.statuscode).json({
    success: false,
    message: err.message,
    err: err,
  });
};

export default errerMiddlewere;
