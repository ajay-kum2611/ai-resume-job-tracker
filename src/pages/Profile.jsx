import { useState } from "react";
import Sidebar from "../components/sidebar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Profile
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your account information.
        </p>

        <div className="mt-8 max-w-2xl rounded-2xl border border-indigo-100 bg-white/90 p-8 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
          {/* Profile Avatar */}
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700 shadow-sm">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {name || "User"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {email}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500"
              />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;