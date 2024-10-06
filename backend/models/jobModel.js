const { required } = require("joi");
const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clientModel",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    des: {
      type: String,
      trim: true,
      required: true,
    },
    cat: {
      type: String,
      trim: true,
      required: true,
    },
    level: {
      type: String,
      trim: true,
      required: true,
    },
    timePriod: {
      type: String,
      trim: true,
      required: true,
    },
    prize: {
      type: Number,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      req: true,
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobmodel", jobSchema);
