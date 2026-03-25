import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();

    fetch("http://localhost:5000/api/internships")
      .then((res) => res.json())
      .then((data) => setInternships(data));
  }, []);

  const loadApplications = async () => {
    const res = await fetch("http://localhost:5000/api/applications");
    const data = await res.json();
    setApplications(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/applications/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    alert(`Status updated to ${status}`);
    loadApplications();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)",
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

      {/* Search */}
      <input
        placeholder="Search student"
        className="form-control mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="container mt-4">
        <h2 className="text-white text-center mb-4">
          Internship Applications
        </h2>

        <div className="row">
          {internships.map((internship) => {
            const companyApps = applications.filter(
              (a) =>
                a.internshipId?._id === internship._id &&
                (a.studentId?.name || "")
                  .toLowerCase()
                  .includes(search.toLowerCase())
            );

            return (
              <div key={internship._id} className="mb-5">
                <h4
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                    fontWeight: "600",
                  }}
                >
                  {internship.title}
                </h4>

                <p style={{ textAlign: "center", color: "#cbd5e1" }}>
                  Total Applicants: {companyApps.length}
                </p>

                <p style={{ textAlign: "center", color: "#94a3b8" }}>
                  Seats Left:
                  {internship.maxApplicants
                    ? internship.maxApplicants - companyApps.length
                    : " No limit"}{" "}
                  / {internship.maxApplicants || "∞"}
                </p>

                {/* Excel */}
                <div className="text-center mb-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/api/export/${internship._id}`
                      )
                    }
                  >
                    Download Excel
                  </button>
                </div>

                <div className="row">
                  {companyApps.length > 0 ? (
                    companyApps.map((app) => (
                      <div className="col-md-4 mb-4" key={app._id}>
                        <div className="card shadow p-3 h-100">
                          {/* Student */}
                          <p>
                            <b>Student:</b>{" "}
                            {app.studentId?.name || "No name"}
                          </p>

                          {/* Enrollment */}
                          <p>
                            <b>Enrollment:</b>{" "}
                            {app.studentId?.enrollment || "N/A"}
                          </p>

                          {/* Email */}
                          <p>
                            <b>Email:</b>{" "}
                            {app.studentId?.email || "N/A"}
                          </p>

                          {/* Status */}
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
                                fontWeight: "bold",
                              }}
                            >
                              {app.status || "Pending"}
                            </span>
                          </p>

                          {/* Buttons */}
                          <div className="d-flex justify-content-between mb-2">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                updateStatus(app._id, "Approved")
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                updateStatus(app._id, "Rejected")
                              }
                            >
                              Reject
                            </button>
                          </div>

                          {/* Resume */}
                          {app.studentId?.resume ? (
                            <a
                              href={`http://localhost:5000/uploads/${app.studentId.resume}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button className="btn btn-secondary btn-sm w-100">
                                View Resume
                              </button>
                            </a>
                          ) : (
                            <button
                              className="btn btn-secondary btn-sm w-100"
                              disabled
                            >
                              Resume Not Uploaded
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#94a3b8",
                      }}
                    >
                      No students applied yet
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewApplications;