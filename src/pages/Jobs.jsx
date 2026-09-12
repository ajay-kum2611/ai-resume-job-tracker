import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const handleDelete = async (jobId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await axios.delete(
      `https://ai-resume-job-tracker-backend.onrender.com/api/jobs/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setJobs(jobs.filter((job) => job._id !== jobId));

    alert("Job deleted successfully!");
  } catch (error) {
    console.error(error);

    alert("Failed to delete job");
  }
};

  useEffect(() => {
    const fetchJobs = async () => {
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

        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
        Jobs
      </h1>

      <p className="text-slate-500 mb-8 text-base">
        Track your job opportunities
      </p>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <h2 className="text-xl font-bold text-slate-900">
                {job.jobTitle}
              </h2>

              <p className="mt-1 text-base font-medium text-slate-600">
                {job.company}
              </p>

              <p className="mt-1 text-base text-slate-500">
                {job.location}
              </p>

              <span className="inline-block mt-4 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-base font-semibold">
                {job.status}
              </span>

              <button
                onClick={() => navigate(`/edit-job/${job._id}`)}
                className=" ml-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-base font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200">                    
                ✏️ Edit
              </button>

              <button
                onClick={() => handleDelete(job._id)}
                className="ml-3 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-base font-semibold hover:bg-red-100 transition-all duration-200">
                    
                🗑️ Delete
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;