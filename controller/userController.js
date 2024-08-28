import ErrorHandler from "../errorHandler/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import registerToken from "../helper/registerToken.js";
import createToken from "../helper/logInJwtToken.js";
import { json } from "express";

class UserController {
  static async userRegistration(req, res, next) {
    try {
      const { name, email, password, phone, role } = req.body;

      // check if all the required field is provided or not
      if (!name || !email || !password) {
        return next(new ErrorHandler("all the fields are required", 404));
      }

      // check is the mail is exis or not
      const isMailExist = await User.findOne({ email });
      if (isMailExist) {
        return next(new ErrorHandler("email is already used", 404));
      }
      // setup the user payload
      const user = {
        name,
        email,
        phone,
        password,
        role,
      };

      const token = registerToken(user);
      const code = token.secretCode;

      return res.status(200).json({
        success: true,
        message: "user is registered",
        code,
        token: token.registerToken,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 404));
    }
  }

  static async userCreate(req, res, next) {
    try {
      const { code, token } = req.body;

      // check if the required field is provided or not
      if (!code || !token) {
        return next(new ErrorHandler("token and code both are required", 404));
      }

      // verifi the code and token
      const isVerifiedUser = jwt.verify(token, process.env.REGISTER_SECRET);
      if (isVerifiedUser.secretCode !== code) {
        return next(
          new ErrorHandler("plz, entered into the correct secret code", 404)
        );
      }

      // store the register user in the database
      const user = isVerifiedUser.user;
      const createUser = await User.create(user);

      // return the response
      return res.status(201).json({
        success: true,
        message: "user is created",
        user: createUser,
      });
    } catch (err) {
      new ErrorHandler(err.message, 404);
    }
  }

  static async userLogIn(req, res, next) {
    try {
      const { email, password } = req.body;

      // check if all the required field are provided or not
      if (!email || !password) {
        return next(
          new ErrorHandler("email and password both are required", 404)
        );
      }

      // check if the eamil is exist or not
      const isExistUser = await User.findOne({ email });
      if (!isExistUser) {
        next(new ErrorHandler("user is not found", 404));
      }

      // check if the password is match or not
      const isMatchPass = bcrypt.compare(password, isExistUser.password);
      if (!isMatchPass) {
        next(new ErrorHandler("password is not match", 404));
      }

      // create access token and refresh token
      const { accessToken, refreshToken } = createToken(isExistUser);
      const accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRES);
      const refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRES);

      // option for cookies
      const accessTokenOption = {
        expires: new Date(Date.now() + accessTokenExpires * 1000),
        httpOnly: true,
      };
      const refreshTokenOption = {
        expires: new Date(Date.now() + refreshTokenExpires * 1000),
        httpOnly: true,
      };

      // send the cookie response
      res.cookie("access_token", accessToken, accessTokenOption);
      res.cookie("refresh_token", refreshToken, refreshTokenOption);

      // return the respone
      return res.status(201).json({
        success: true,
        message: "user is logged in",
        user: isExistUser,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 404));
    }
  }
}

export default UserController;
