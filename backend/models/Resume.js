const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "My Resume",
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      trim: true,
    },

    education: {
      type: String,
      trim: true,
    },

    projects: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);