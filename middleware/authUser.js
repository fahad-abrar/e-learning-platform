import jwt from "jsonwebtoken";
import ErrorHandler from "../errorHandler/errorHandler.js";

const isAuthenticate = async (req, res, next) => {
  try {
    //check if the user has access token or not
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return next(new ErrorHandler("plz login to access this resource", 400));
    }

    // check if the token is valid or not
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) {
      return next(new ErrorHandler("access token is not valid", 400));
    }

    // send the user through request
    req.user = decode;
    next();

    //if redis is used
    //const user = await radis.get(decode.id)
    // if(!user){
    //     return next(new ErrorHandler('user is not found', 400))
    // }
    // req.user = JSON.parse(user)
  } catch (error) {
    next(new ErrorHandler("invalid token"));
  }
};

export default isAuthenticate;
