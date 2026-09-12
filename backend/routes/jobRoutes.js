const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      company,
      jobTitle,
      location,
      jobUrl,
      status,
      notes,
    } = req.body;

    if (!company || !jobTitle) {
      return res.status(400).json({
        message: "User, company and job title are required",
      });
    }

    const job = new Job({
      userId: req.user.userId,
      company,
      jobTitle,
      location,
      jobUrl,
      status,
      notes,
    });

    await job.save();

    res.status(201).json({
      message: "Job added successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get job statistics for a user
router.get("/stats/:userId", authMiddleware , async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalJobs = await Job.countDocuments({ userId });

    const applied = await Job.countDocuments({
      userId,
      status: "Applied",
    });

    const interviews = await Job.countDocuments({
      userId,
      status: "Interview",
    });

    const offers = await Job.countDocuments({
      userId,
      status: "Offer",
    });

    const rejected = await Job.countDocuments({
      userId,
      status: "Rejected",
    });

    res.json({
      totalJobs,
      applied,
      interviews,
      offers,
      rejected,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get all jobs for a user
router.get("/:userId",authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Update a job
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      company,
      jobTitle,
      location,
      jobUrl,
      status,
      notes,
    } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        company,
        jobTitle,
        location,
        jobUrl,
        status,
        notes,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Delete a job
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const deletedJob = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});



module.exports = router;