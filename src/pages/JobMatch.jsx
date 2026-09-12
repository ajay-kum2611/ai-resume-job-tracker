import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

function JobMatch() {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.get(
          `http://localhost:5000/api/jobs/${user.id}`,
              {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setJobs(jobsResponse.data);

        const resumeResponse = await axios.get(
          `http://localhost:5000/api/resumes/${user.id}`,
              {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setResume(resumeResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleMatch = async () => {
    if (!selectedJob) {
      alert("Please select a job");
      return;
    }

    if (!resume) {
      alert("Please create your resume first");
      return;
    }

    const job = jobs.find((item) => item._id === selectedJob);

    try {
      setMatching(true);
      setResult(null);

      const response = await axios.post(
        "http://localhost:5000/api/job-match/match",
        {
          resume,
          job,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      alert("Job matching failed");
    } finally {
      setMatching(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Job Match
        </h1>

        <p className="mt-3 text-base font-medium text-gray-600">
          Compare your resume with a saved job using AI.
        </p>

        {!resume ? (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <p className="text-gray-600">
              Please create your resume before using Job Match.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 w-full max-w-5xl rounded-2xl bg-white/90 p-8 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <label className="mb-2 block font-medium">
                Select a Job
              </label>

              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-gray-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Choose a saved job</option>

                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.company} — {job.jobTitle}
                  </option>
                ))}
              </select>

              <button
                onClick={handleMatch}
                disabled={matching}
                className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {matching
                  ? "Analyzing..."
                  : "🎯 Check Job Match"}
              </button>
            </div>

            {result && (
              <div className="mt-8 space-y-6">

                {/* Match Score */}
                <div className="rounded-2xl bg-white/90 p-6 text-center border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    Job Match Score
                  </h2>

                  <div className="mt-4 text-6xl font-bold text-blue-600 tracking-tight">
                    {result.matchScore}%
                  </div>

                  <p className="mt-2 text-gray-500">
                    Resume compatibility with this job
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                {/* Matching Skills */}
              
                <div className="rounded-2xl bg-white/90 p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    ✅ Matching Skills
                  </h2>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                    {result.matchingSkills?.map(
                      (skill, index) => (
                        <li key={index}>{skill}</li>
                      )
                    )}
                  </ul>
                </div>

                {/* Missing Skills */}

                <div className="rounded-2xl bg-white/90 p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    ⚠️ Missing Skills
                  </h2>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                    {result.missingSkills?.map(
                      (skill, index) => (
                        <li key={index}>{skill}</li>
                      )
                    )}
                  </ul>
                </div>
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl bg-white/90 p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-lg font-bold text-gray-900">
                    💡 Recommendations
                  </h2>

                  <ul className="mt-4 space-y-3 text-gray-600">
                    {result.recommendations?.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default JobMatch;