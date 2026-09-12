const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/match", authMiddleware, async (req, res) => {
  try {
    const {
      resume,
      job,
    } = req.body;

    if (!resume || !job) {
      return res.status(400).json({
        message: "Resume and job data are required",
      });
    }

    const prompt = `
You are an expert technical recruiter and resume evaluator.

Compare the candidate's resume with the job information below.

CANDIDATE RESUME:

Summary:
${resume.summary || "Not provided"}

Skills:
${Array.isArray(resume.skills)
  ? resume.skills.join(", ")
  : resume.skills || "Not provided"}

Experience:
${resume.experience || "Not provided"}

Education:
${resume.education || "Not provided"}

Projects:
${resume.projects || "Not provided"}


JOB:

Company:
${job.company || "Not provided"}

Job Title:
${job.jobTitle || "Not provided"}

Location:
${job.location || "Not provided"}

Job Description / Notes:
${job.notes || "Not provided"}


Analyze:

1. How well the resume matches the job.
2. Skills that match.
3. Skills that are missing.
4. Important recommendations.
5. Overall suitability.

Return ONLY valid JSON.
Do not use markdown.
Do not put the JSON inside code blocks.

Use exactly this structure:

{
  "matchScore": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "recommendations": []
}

Rules:
- matchScore must be between 0 and 100.
- matchingSkills should contain 3 to 8 items when possible.
- missingSkills should contain 2 to 8 items when possible.
- recommendations should contain 2 to 5 useful actionable points.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("Gemini job match response:", text);

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanedText);

    res.json({
      message: "Job matching completed successfully",
      result,
    });

  } catch (error) {
    console.error("Job matching error:", error);

    res.status(500).json({
      message: "Job matching failed",
      error: error.message,
    });
  }
});

module.exports = router;