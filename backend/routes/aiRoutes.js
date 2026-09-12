const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/analyze-resume", authMiddleware, async (req, res) => {
  try {
    const {
      summary,
      skills,
      experience,
      education,
      projects,
    } = req.body;

    if (!summary && !skills && !experience && !education && !projects) {
      return res.status(400).json({
        message: "Resume data is required",
      });
    }

    const prompt = `
You are an expert professional resume reviewer.

Analyze the following resume carefully.

Professional Summary:
${summary || "Not provided"}

Skills:
${Array.isArray(skills) ? skills.join(", ") : skills || "Not provided"}

Experience:
${experience || "Not provided"}

Education:
${education || "Not provided"}

Projects:
${projects || "Not provided"}

Evaluate the resume based on:
- Technical skills
- Experience
- Projects
- Education
- Professional summary
- ATS friendliness
- Overall quality

Return ONLY valid JSON.

Use exactly this structure:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:
- score must be a number between 0 and 100
- strengths should contain 3 to 5 useful points
- weaknesses should contain 3 to 5 useful points
- suggestions should contain 3 to 5 actionable points
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("Gemini response:", text);

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(cleanedText);

    res.json({
      message: "AI analysis completed successfully",
      analysis,
    });

  } catch (error) {
    console.error("Gemini AI analysis error:", error);

    res.status(500).json({
      message: "AI analysis failed",
      error: error.message,
    });
  }
});

module.exports = router;