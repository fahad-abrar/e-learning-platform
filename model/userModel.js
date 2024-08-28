import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "plz enter your name"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "plz enter your email"],
    },
    phone: {
      type: String,
      require: [true, "plz enter your phone number"],
    },
    password: {
      type: String,
      require: [true, "plz enter your password"],
      minLegth: [6, "password must be greater than 6 characters"],
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
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create the user model
const User = mongoose.model("User", userSchema);

export default User;
