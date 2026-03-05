import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewApplications() {

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const res = await fetch("http://localhost:5000/api/applications");
    const data = await res.json();
    setApplications(data);
  };

  const updateStatus = async (id, status) => {

    await fetch(`http://localhost:5000/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    alert("Status updated");

    loadApplications();
  };

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

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin")}
        >
          🏠 Home
        </button>

      </nav>


      {/* Page Title */}

      <div className="container mt-4">

        <h2 className="text-white text-center mb-4">
          Internship Applications
        </h2>


        <div className="row">

          {applications.map(app => (

            <div className="col-md-4 mb-4" key={app._id}>

              <div className="card shadow p-3">

                <p><b>Student:</b> {app.studentId?.name}</p>

                <p><b>Internship:</b> {app.internshipId?.title}</p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        app.status === "Approved"
                          ? "green"
                          : app.status === "Rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold"
                    }}
                  >
                    {app.status}
                  </span>
                </p>

                <div className="d-flex justify-content-between mt-2">

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(app._id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(app._id, "Rejected")}
                  >
                    Reject
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ViewApplications;