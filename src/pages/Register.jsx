import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ai-resume-job-tracker-backend.onrender.com/api/auth/register",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-400 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-lg rounded-3xl border border-indigo-100 bg-white/90 p-10 shadow-xl backdrop-blur-sm">

        <h1 className="text-4xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="text-gray-500 mt-3 test-base">
          Start tracking your job applications.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
          >
            Create Account
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>

        </form>

        {message && (
          <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-700">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default Register;