import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState("Saved");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

       const response = await axios.get(
        `https://ai-resume-job-tracker-backend.onrender.com/api/jobs/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

        const job = response.data.find(
          (job) => job._id === id
        );

        if (!job) {
          alert("Job not found");
          navigate("/jobs");
          return;
        }

        setCompany(job.company);
        setJobTitle(job.jobTitle);
        setLocation(job.location || "");
        setJobUrl(job.jobUrl || "");
        setStatus(job.status);
        setNotes(job.notes || "");
      } catch (error) {
        console.error(error);
        alert("Failed to load job");
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://ai-resume-job-tracker-backend.onrender.com/api/jobs/${id}`,
        {
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
        }
      );

      alert("Job updated successfully!");

      navigate("/jobs");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update job"
      );
    }
  };

  return (
    <div className="p-8 w-full">

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Edit Job
      </h1>

      <p className="text-gray-500 mb-8">
        Update your job information
      </p>

      <form
        onSubmit={handleUpdate}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 shadow-sm space-y-6"
      >

        <div>
          <label className="block font-medium mb-1">
            Company
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Job Title
          </label>

          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Job URL
          </label>

          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
        >
          Update Job
        </button>

      </form>
    </div>
  );
}

export default EditJob;