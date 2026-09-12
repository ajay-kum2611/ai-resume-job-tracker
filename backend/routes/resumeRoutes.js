const express = require("express");
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create or save a resume
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      summary,
      skills,
      experience,
      education,
      projects,
    } = req.body;

    const resume = new Resume({
      userId: req.user.userId,
      title,
      summary,
      skills,
      experience,
      education,
      projects,
    });

    await resume.save();

    res.status(201).json({
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get resume for a user
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      userId: req.user.userId,
    }).sort({ updatedAt: -1 });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;