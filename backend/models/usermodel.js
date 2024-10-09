const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
    },
    is_online: {
      type: String,
      default: "0",
    },

    otp: {
      type: String,
    },

    otpexpire: {
      type: Date,
    },
    otpVerifiy: {
      type: Boolean,
      default: false,
    },
    domain: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: {
      type: Object,
    },
    isclient: {
      type: Boolean,
      default: false,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobmodel",
    },
    portfolio: {
      type: String,
    },
    level: {
      type: String,
    },
    ratings: {
      type: String,
    },
    timeZone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usermodel", userSchema);
