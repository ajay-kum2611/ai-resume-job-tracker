import { useEffect, useState } from "react";
import axios from "axios";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await axios.get(
          `http://localhost:5000/api/applications/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Applications
      </h1>

      <p className="text-gray-600 mb-8">
        Track your job applications
      </p>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications yet.
        </p>
      ) : (
        <div className="space-y-5">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-2xl border border-indigo-100 bg-white/90 backdrop-blur-sm p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    {application.jobId?.company?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {application.jobId?.jobTitle}
                    </h2>

                    <p className="mt-1 font-medium text-gray-600">
                      {application.jobId?.company}
                    </p>

                    <p className="mt-1 text-base text-gray-500">
                      {application.jobId?.location}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xl font-semibold ${
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

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-base text-gray-500">
                  <span className="font-semibold text-gray-700">Applied:</span>{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </p>

                {application.notes && (
                  <p className="mt-2 text-base text-gray-600">
                    <span className="font-semibold text-gray-700">Notes:</span>{" "}
                    {application.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;