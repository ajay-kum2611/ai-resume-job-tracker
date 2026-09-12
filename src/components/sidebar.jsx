import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-white p-5 shadow-xl">
      <h2 className="text-xl font-bold mb-10">
        AI Job Tracker
      </h2>

      <nav className=" mt-2 space-y-2">

        <Link
          to="/dashboard"
          className="block p-3 rounded-xl bg-white/10 text-white font-semibold shadow-sm transition-all duration-200"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/resume"
          className="block p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          📄 Resume
        </Link>

        <Link
          to="/resume-analysis"
          className="block p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            🤖 AI Analysis
        </Link>

        <Link
          to="/jobs"
          className="block p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          💼 Jobs
        </Link>

        <Link
          to="/job-match"
          className="block p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          🎯 Job Match
        </Link>

        <Link
          to="/applications"
          className="block p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          📋 Applications
        </Link>

        <Link
          to="/profile"
          className="block p-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          👤 Profile
        </Link>



      </nav>

      <button
        onClick={handleLogout}
        className="w-full mt-10 p-3 rounded-xl bg-pink-500/90 hover:bg-pink-500 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-200"
      >
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;