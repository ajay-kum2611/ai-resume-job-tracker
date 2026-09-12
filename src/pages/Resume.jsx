import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

function Resume() {
  const [formData, setFormData] = useState({
    title: "My Resume",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/resumes/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const resume = response.data;

        setFormData({
          title: resume.title || "My Resume",
          summary: resume.summary || "",
          skills: resume.skills ? resume.skills.join(", ") : "",
          experience: resume.experience || "",
          education: resume.education || "",
          projects: resume.projects || "",
        });
      } catch (error) {
        // No resume created yet
        console.log("No existing resume found");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [user.id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/resumes", {
        userId: user.id,
        title: formData.title,
        summary: formData.summary,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        experience: formData.experience,
        education: formData.education,
        projects: formData.projects,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Resume saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save resume");
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          My Resume
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Create and manage your resume for AI analysis.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-4xl space-y-7"
        >
          {/* Resume Title */}
          <div>
            <label className="mb-2 block text-base font-semibold text-slate-700">
              Resume Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="My Resume"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="mb-2 block text-base font-semibold text-slate-700">
              Professional Summary
            </label>

            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="Write a short professional summary..."
            />
          </div>

          {/* Skills */}
          <div>
            <label className="mb-2 block text-base font-semibold text-slate-700">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="React, JavaScript, Node.js, MongoDB"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate skills using commas.
            </p>
          </div>

          {/* Experience */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-slate-700">
              Experience
            </label>

            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="6"
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="Describe your work experience..."
            />
          </div>

          {/* Education */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-slate-700">
              Education
            </label>

            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="B.Tech in Computer Science..."
            />
          </div>

          {/* Projects */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-slate-700">
              Projects
            </label>

            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              rows="6"
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3.5 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="Describe your projects..."
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md"
          >
            Save Resume
          </button>
        </form>
      </main>
    </div>
  );
}

export default Resume;