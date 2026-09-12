const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add an application
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      jobId,
      status,
      appliedDate,
      interviewDate,
      notes,
    } = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: "Job is required",
      });
    }

    const application = new Application({
      userId: req.user.userId,
      jobId,
      status,
      appliedDate,
      interviewDate,
      notes,
    });

    await application.save();

    res.status(201).json({
      message: "Application added successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get applications for a user
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user.userId,
    })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;