import ErrorHandler from "../errorHandler/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import User from "../model/userModel.js";
import registerToken from "../helper/registerToken.js";
import createToken from "../helper/logInJwtToken.js";
import sendMail from "../helper/sendMailer.js";

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

      // set up the mail object to send the mail
      const mailObs = {
        to: email,
        subject: "",
        text: "",
        html: "",
      };

      // send the mail to the user
      //sendMail(mailObs)

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
        return next(new ErrorHandler("user is not found", 404));
      }

      // check if the password is match or not
      const isMatchPass = bcrypt.compareSync(password, isExistUser.password);
      if (!isMatchPass) {
        return next(new ErrorHandler("password is not match", 404));
      }

      // create access token and refresh token
      const { accessToken, refreshToken } = createToken(isExistUser);
      const accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRES);
      const refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRES);

      // option for cookies
      const accessTokenOption = {
        expires: new Date(Date.now() + accessTokenExpires * 1000 * 100000),
        httpOnly: true,
      };
      const refreshTokenOption = {
        expires: new Date(Date.now() + refreshTokenExpires * 1000 * 100000),
        httpOnly: true,
      };

      // send the cookie response
      res.cookie("accessToken", accessToken, accessTokenOption);
      res.cookie("refreshToken", refreshToken, refreshTokenOption);

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

  static async userLogout(req, res, next) {
    try {
      // access the id from the auth user
      const { id } = req.user;

      // find the auth user
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHandler("invalid credential", 404));
      }

      // set the cookie option
      const option = {
        expires: new Date(Date.now() + 10),
        httpOnly: true,
      };

      // clear the cookie and send the response
      res.cookie("accessToken", null, option);
      res.cookie("refreshToken", null, option);

      // return the response
      return res.status(200).json({
        success: true,
        message: " user is logout",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  }

  static async getUser(req, res, next) {
    try {
      const user = await User.find();
      if (!user) {
        next(new ErrorHandler("user is not found", 404));
      }

      return res.status(200).json({
        success: true,
        message: " user is retrieved",
        user,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 404));
    }
  }

  static async getUserById(req, res, next) {
    try {
      // retrieved the user id
      const { id } = req.user;
      const user = await User.findById(id);

      // check if the user is exis t or not
      if (!user) {
        next(new ErrorHandler("user is not found", 404));
      }

      // send the response
      return res.status(200).json({
        success: true,
        message: " user is retrieved",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  }

  static async updatetokens(req, res, next) {
    try {
      // retrieved the refresh token
      const token = req.cookies.refreshToken;

      // verify the token and retrived user from this
      const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      if (!decode) {
        next(new ErrorHandler("user is not found", 404));
      }

      // option for cookies
      const accessTokenOption = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60),
        httpOnly: true,
      };
      const refreshTokenOption = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      const payload = {
        id: decode.id,
        name: decode.name,
        email: decode.email,
      };

      // new access and refresh token
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3d",
      });

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
      });

      // send the new cookies
      res.cookie("accessToken", accessToken, accessTokenOption);
      res.cookie("refreshToken", refreshToken, refreshTokenOption);

      // send the response
      return res.status(200).json({
        success: true,
        message: "token is updated",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 404));
    }
  }

  static async updateUserInfo(req, res, next) {
    try {
      // retrieved the user info
      const { name, email, phone } = req.body;

      // check if the user is exist or not
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("user is not found", 404));
      }
      if (user && email) {
        // check if the email is exist or not
        const isExistEmail = await User.findOne({ email });
        if (isExistEmail) {
          return next(new ErrorHandler("email is already exist", 404));
        }
        user.email = email;
      }
      (user.name = name), (user.phone = phone);

      // save the user info
      await user.save();

      // sens the response
      return res.status(201).json({
        success: true,
        message: "userinfo is updated",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  }

  static async socialAuth(req, res, next) {
    try {
      // retrieved the user info
      const { name, email, phone, avatar } = req.body;

      // check if the email is exist or not
      const isExistEmail = await User.findOne({ email });
      if (isExistEmail) {
        return next(new ErrorHandler("email is already exist", 404));
      }

      // save user info
      const user = await User.create({
        name,
        email,
        phone,
        avatar,
      });

      // sens the response
      return res.status(201).json({
        success: true,
        message: "userinfo is updated",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  }

  static async updatePassword(req, res, next) {
    try {
      // retrieved all the required info
      const { password, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.user.id);

      // check all the required fields are provided or not
      if (!password || !newPassword || !confirmPassword) {
        return next(new ErrorHandler("all fields are required"));
      }

      // check if the password is match or not
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(new ErrorHandler("password is not correct", 404));
      }

      // chek if the new and confirm password is match or not
      if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("password is not match", 404));
      }

      // save the new password
      user.password = newPassword;
      await user.save();
      return res.status(201).json({
        success: true,
        message: "userinfo is updated",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  }

  static async uploadAvatar(req, res, next) {
    try {
      // retrieved the avatar
      const { avatar } = req.body;

      // Check if the user is exist
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // upload the new avatar
      const myAvatar = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
      });

      // if the user already has an avatar, delete the old one
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }

      // set the public id and url
      user.avatar = {
        public_id: myAvatar.public_id,
        url: myAvatar.secure_url,
      };

      // save avatar into the user data
      await user.save();
      return res.status(201).json({
        success: true,
        message: "avatar is uploaaded",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
}

export default UserController;
