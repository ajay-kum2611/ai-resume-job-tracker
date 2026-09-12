import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

function ResumeAnalysis() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `https://ai-resume-job-tracker-backend.onrender.com/api/resumes/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setResume(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [user.id]);

  const handleAnalyze = async () => {
  try {
    setAnalyzing(true);

    const response = await axios.post(
      "https://ai-resume-job-tracker-backend.onrender.com/api/ai/analyze-resume",
      {
        summary: resume.summary,
        skills: resume.skills,
        experience: resume.experience,
        education: resume.education,
        projects: resume.projects,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setAnalysis(response.data.analysis);
  } catch (error) {
    console.error(error);
    alert("AI analysis failed");
  } finally {
    setAnalyzing(false);
  }
};

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!resume) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold">
            Resume Analysis
          </h1>

          <p className="mt-4 text-gray-600">
            Please create your resume first.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          AI Resume Analysis
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Get AI-powered feedback on your resume.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Resume Score */}
          <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Resume Score
            </h2>

            <div className="mt-6 text-center">
              <div className="text-6xl font-extrabold tracking-tight text-indigo-600">
                78
              </div>

              <p className="mt-2 text-gray-500">
                out of 100
              </p>
            </div>
          </div>

          {/* Resume Overview */}
          <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Resume Overview
            </h2>

            <p className="mt-4 text-gray-600">
              <strong>Title:</strong> {resume.title}
            </p>

            <p className="mt-3 text-gray-600">
              <strong>Skills:</strong>{" "}
              {resume.skills?.join(", ")}
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 mt-6 hover:shadow-md">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            ✅ Strengths
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Good technical skill coverage</li>
            <li>Projects are included</li>
            <li>Professional summary is present</li>
          </ul>
        </div>

        {/* Improvements */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            💡 Areas for Improvement
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Add measurable achievements</li>
            <li>Improve project descriptions</li>
            <li>Include more job-relevant keywords</li>
          </ul>
        </div>

        {analysis && (
            <div className="mt-8 space-y-6">

                <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        AI Resume Score
                    </h2>

                <div className="mt-4 text-5xl font-bold text-blue-600">
                    {analysis.score}/100
                </div>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        ✅ Strengths
                    </h2>

                   <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                        {analysis.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        ⚠️ Weaknesses
                    </h2>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                        {analysis.weaknesses.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        💡 Suggestions
                    </h2>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                        {analysis.suggestions.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

            </div>
        )}

        <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
            {analyzing ? "Analyzing..." : "🤖 Analyze with AI"}
        </button>
      </main>
    </div>
  );
}

export default ResumeAnalysis;