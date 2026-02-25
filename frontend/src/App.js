import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Internships from "./pages/Internships";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import UploadResume from "./pages/UploadResume";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AddInternship from "./pages/AddInternship";
import ViewApplications from "./pages/ViewApplications";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/student-dashboard" element={<StudentDashboard />} />

        <Route path="/internships" element={<Internships />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/my-applications" element={<MyApplications />} />

        <Route path="/upload-resume" element={<UploadResume />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin-register" element={<AdminRegister />} />

        <Route path="/add-internship" element={<AddInternship />} />

        <Route path="/view-applications" element={<ViewApplications />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;