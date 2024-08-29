import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "plz enter your name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "plz enter your email"],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "plz enter your password"],
      minlegth: [6, "password must be greater than 6 characters"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVrified: {
      type: Boolean,
      default: false,
    },
    courses: [{ courseId: String }],
    accessToken: String,
    forgotPasswordToken: String,
    forgotPasswordTokenValidity: Date,
  },
  { timestamps: true }
);

// pre-middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

// create the user model
const User = mongoose.model("User", userSchema);

export default User;
