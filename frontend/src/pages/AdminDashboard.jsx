import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin-login");
  };
  const [stats,setStats] = useState({});

useEffect(()=>{

 fetch("http://localhost:5000/api/applications/stats")
 .then(res=>res.json())
 .then(data=>setStats(data));

},[]);

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)"
      }}
    >

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Admin Panel</h5>

        <div>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/add-internship")}
          >
            Add Internship
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/view-applications")}
          >
            View Applications
          </button>

          {/* NEW BUTTON */}

          <button
            className="btn btn-outline-info me-2"
            onClick={() => navigate("/all-students")}
          >
            All Students
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>

      {/* Dashboard */}

      <div className="container mt-5 text-center">

        <h2 className="text-white mb-4">Admin Dashboard</h2>

        <div className="row justify-content-center">

          <div className="col-md-4">
            <div className="card shadow p-4">
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
            <div className="card shadow p-4">
              <h5>View Applications</h5>
              <button
                className="btn btn-success mt-2"
                onClick={() => navigate("/view-applications")}
              >
                Open
              </button>
            </div>
          </div>

          {/* <button
          onClick={() =>
            // window.open(`http://localhost:5000/api/export/${item._id}`)
            window.open("http://localhost:5000/api/export/test")
          }
        >
        Download Excel
        </button> */}

          {/* NEW CARD */}

          <div className="col-md-4">
            <div className="card shadow p-4">
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
      <div>

        <h3>Total: {stats.total}</h3>

        <h3>Approved: {stats.approved}</h3>

        <h3>Rejected: {stats.rejected}</h3>

        <h3>Pending: {stats.pending}</h3>

        </div>

    </div>
    
  );
}

export default AdminDashboard;