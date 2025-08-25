const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true, // to avoid duplicate email ids
      trim: true, // to remove whitespace
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value) {
        // Use ES6 import for validator if using ES modules, otherwise require
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password must be strong (min 8 chars, include uppercase, lowercase, number, and symbol)");
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        const allowedGenders = ["male", "female", "other"];
        if (!allowedGenders.includes(value.toLowerCase())) {
          throw new Error("Gender must be 'male', 'female', or 'other'");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
    },
    bio: {
      type: String,
      default: "This is default about of the  user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
