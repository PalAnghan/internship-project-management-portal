import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });

  // ✅ Fetch stats
  useEffect(() => {
    fetch("http://localhost:5000/api/applications/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)",
        paddingBottom: "40px"
      }}
    >

      {/* 🔥 Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Admin Panel</h5>

        <div>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/add-internship")}
          >
            ➕ Add Internship
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/view-applications")}
          >
            📄 Applications
          </button>

          <button
            className="btn btn-outline-info me-2"
            onClick={() => navigate("/all-students")}
          >
            👨‍🎓 Students
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>

      {/* 🔥 Dashboard */}
      <div className="container mt-5">

        <h2 className="text-white text-center mb-4">
          Admin Dashboard
        </h2>

        {/* ✅ STATS CARDS */}
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

        {/* ✅ ACTION CARDS */}
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5>Add Internship</h5>

              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate("/add-internship")}
              >
                Open
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5>View Applications</h5>

              <button
                className="btn btn-success mt-2"
                onClick={() => navigate("/view-applications")}
              >
                Open
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow text-center p-4">
              <h5>All Students</h5>

              <button
                className="btn btn-info mt-2"
                onClick={() => navigate("/all-students")}
              >
                View
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;