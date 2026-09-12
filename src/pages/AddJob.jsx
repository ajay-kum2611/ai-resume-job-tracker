import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddJob() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState("Saved");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:5000/api/jobs", {
        userId: user.id,
        company,
        jobTitle,
        location,
        jobUrl,
        status,
        notes,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Job added successfully!");

      navigate("/jobs");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add job"
      );
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
        Add Job
      </h1>

      <p className="text-gray-600 mb-8 text-base">
        Add a new job opportunity to your tracker
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-indigo-100 bg-white/90 p-8 shadow-sm backdrop-blur-sm space-y-6"
      >

        {/* Company */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Company
          </label>

          <input
            type="text"
            placeholder="e.g. Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Job Title
          </label>

          <input
            type="text"
            placeholder="e.g. Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Location
          </label>

          <input
            type="text"
            placeholder="e.g. Bangalore"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Job URL */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Job URL
          </label>

          <input
            type="url"
            placeholder="https://example.com/job"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Notes
          </label>

          <textarea
            placeholder="Add notes about this job..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
            rows="4"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
        >
          Add Job
        </button>

      </form>
    </div>
  );
}

export default AddJob;