import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import Jobs from "./pages/Jobs";

import AddJob from "./pages/AddJob";

import EditJob from "./pages/EditJob";

import Applications from "./pages/Applications.jsx";

import Resume from "./pages/Resume.jsx";

import ResumeAnalysis from "./pages/ResumeAnalysis.jsx";

import JobMatch from "./pages/JobMatch.jsx";

import Profile from "./pages/Profile.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />  

        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-analysis"
          element={
            <ProtectedRoute>
              <ResumeAnalysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-job"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-match"
          element={
            <ProtectedRoute>
              <JobMatch />
            </ProtectedRoute>
          }
        />



        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>


    </BrowserRouter>
  );
}

export default App;