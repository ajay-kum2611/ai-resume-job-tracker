import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/sidebar";

function Dashboard() {

  const [stats, setStats] = useState({
    totalJobs: 0,
    applied: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const [applicationStats, setApplicationStats] = useState({
    applied: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  });

  const statusData = [
  {
    label: "Saved",
    value: stats.totalJobs -
      stats.applied -
      stats.interviews -
      stats.offers -
      stats.rejected,
  },
  {
    label: "Applied",
    value: stats.applied,
  },
  {
    label: "Interview",
    value: stats.interviews,
  },
  {
    label: "Offer",
    value: stats.offers,
  },
  {
    label: "Rejected",
    value: stats.rejected,
  },
];

  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
  const fetchRecentApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `http://localhost:5000/api/applications/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

      setRecentApplications(response.data.slice(0, 5));
      const applications = response.data;

      setApplicationStats({
        applied: applications.filter((app) => app.status === "Applied").length,
        interviews: applications.filter((app) => app.status === "Interview").length,
        offers: applications.filter((app) => app.status === "Offer").length,
        rejected: applications.filter((app) => app.status === "Rejected").length,
      });

    } catch (error) {
      console.error("Error fetching recent jobs:", error);
    }
  };

  fetchRecentApplications();
}, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await axios.get(
          `http://localhost:5000/api/jobs/stats/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
  };

  fetchStats();
}, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-base text-slate-500">
            Here's what's happening with your job search.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Applications */}
          <div className="bg-white/90 p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Applications
                </p>

                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {stats.applied}
                </h2>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Tracked from your jobs
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                📄
              </div>
            </div>
          </div>


          {/* Interviews */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Interviews
                </p>

                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {stats.interviews}
                </h2>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Keep preparing for interviews
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl shadow-sm">
                🎯
              </div>
            </div>
          </div>


          {/* Offers */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Offers
                </p>

                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  {stats.offers}
                </h2>

                <p className="mt-2 text-sm font-medium text-emerald-600">
                  Congratulations! 🎉
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl shadow-sm">
                🏆
              </div>
            </div>
          </div>

        </div>

        {/* Application Status */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-sm mt-8 p-6 hover:shadow-md transition-shadow duration-200">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Application Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Track the progress of your job applications
              </p>
            </div>

            <div className="text-sm text-gray-500">
              {stats.totalJobs} total jobs
            </div>
          </div>


          <div className="mt-7 space-y-5">

            {statusData.map((item) => {
                const percentage =
                  stats.totalJobs > 0
                    ? (item.value / stats.totalJobs) * 100
                    : 0;

                return (
                  <div key={item.label} className="group py-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                          {item.label}
                        </span>

                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                          {item.value}
                        </span>
                      </div>

                      <span className="text-xs font-medium text-gray-500">
                        {Math.round(percentage)}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-gray-100/80 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.label === "Saved"
                            ? "bg-gray-400"
                            : item.label === "Applied"
                            ? "bg-blue-500"
                            : item.label === "Interview"
                            ? "bg-yellow-500"
                            : item.label === "Offer"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {Math.round(percentage)}% of tracked jobs
                    </p>
                  </div>
                );
              })}
          </div>

        </div>
        {/* Recent Applications */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-sm mt-8 p-6 hover:shadow-md transition-shadow duration-200">

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Recent Applications
          </h2>

          {recentApplications.length === 0 ? (
            <p className="text-gray-500">
              No recent jobs yet.
            </p>
    ) : (
      <div className="space-y-4">
        {recentApplications.map((application) => (
          <div
            key={application._id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                {application.jobId.company?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {application.jobId.company}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {application.jobId.jobTitle}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                application.status === "Applied"
                  ? "bg-blue-100 text-blue-700"
                  : application.status === "Interview"
                  ? "bg-yellow-100 text-yellow-700"
                  : application.status === "Offer"
                  ? "bg-green-100 text-green-700"
                  : application.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {application.status}
            </span>
          </div>
        ))}
      </div>
    )}

        </div>

      </main>
    </div>
  );
}

export default Dashboard;