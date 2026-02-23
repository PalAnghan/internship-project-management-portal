import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Internships from "./pages/Internships";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import UploadResume from "./pages/UploadResume";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/student" element={<StudentDashboard />} />

        <Route path="/internships" element={<Internships />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/my-applications" element={<MyApplications />} />

        <Route path="/upload-resume" element={<UploadResume />} />

      </Routes>
    </Router>
  );
}

export default App;