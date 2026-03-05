import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyApplications() {

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)"
      }}
    >

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Student Portal</h5>

        <div>

          <button
          className="btn btn-outline-light"
          onClick={() => navigate("/student-dashboard")}
        >
          🏠 Home
        </button>
        </div>

      </nav>

      {/* Page Content */}

      <div className="container mt-5">

        <h2 className="text-white text-center mb-4">
          My Applications
        </h2>

        {applications.map(app => (

          <div
            key={app._id}
            className="card shadow p-3 mb-3"
          >

            <h5>{app.internshipId?.title}</h5>

            <p>
              Status:
              <b
                style={{
                  color:
                    app.status === "Approved"
                      ? "green"
                      : app.status === "Rejected"
                      ? "red"
                      : "orange"
                }}
              >
                {" "} {app.status}
              </b>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyApplications;