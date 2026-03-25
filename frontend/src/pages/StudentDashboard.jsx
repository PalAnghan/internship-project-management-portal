import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    // ✅ Fetch student stats
    fetch(`http://localhost:5000/api/applications/student-stats/${user._id}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err));

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)",
        paddingBottom: "40px"
      }}
    >

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <h5 className="text-white">Student Portal</h5>

        <div>
          <button className="btn btn-outline-light me-2"
            onClick={() => navigate("/student-dashboard")}>
            🏠 Home
          </button>

          <button className="btn btn-outline-light me-2"
            onClick={() => navigate("/internships")}>
            💼 Internships
          </button>

          <button className="btn btn-outline-light me-2"
            onClick={() => navigate("/my-applications")}>
            📄 Applications
          </button>

          <button className="btn btn-outline-light me-2"
            onClick={() => navigate("/upload-resume")}>
            ⬆ Upload Resume
          </button>

          <button className="btn btn-outline-light me-2"
            onClick={() => navigate("/profile")}>
            👤 Profile
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* 🔥 STATS CARDS */}
      <div className="container mt-5">
        <h2 className="text-white text-center mb-4">My Dashboard</h2>

        <div className="row text-center mb-5">

          <div className="col-md-3">
            <div className="card p-3 shadow">
              <h5>Total</h5>
              <h3>{stats.total}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow bg-success text-white">
              <h5>Approved</h5>
              <h3>{stats.approved}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow bg-danger text-white">
              <h5>Rejected</h5>
              <h3>{stats.rejected}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow bg-warning">
              <h5>Pending</h5>
              <h3>{stats.pending}</h3>
            </div>
          </div>

        </div>

        {/* Existing Cards */}
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5>View Internships</h5>
              <button className="btn btn-primary mt-2"
                onClick={() => navigate("/internships")}>
                Open
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5>My Applications</h5>
              <button className="btn btn-success mt-2"
                onClick={() => navigate("/my-applications")}>
                Open
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5>Upload Resume</h5>
              <button className="btn btn-warning mt-2"
                onClick={() => navigate("/upload-resume")}>
                Upload
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;