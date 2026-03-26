import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
    loadInternships();
  }, []);

  const loadApplications = async () => {
    const res = await fetch("http://localhost:5000/api/applications");
    const data = await res.json();
    setApplications(data);
  };

  const loadInternships = async () => {
    const res = await fetch("http://localhost:5000/api/internships");
    const data = await res.json();
    setInternships(data);
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/applications/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    alert(`Status updated to ${status}`);
    loadApplications();
  };

  // ✅ DELETE INTERNSHIP
  const deleteInternship = async (id) => {

    if (!window.confirm("Delete this internship?")) return;

    await fetch(`http://localhost:5000/api/internships/${id}`, {
      method: "DELETE"
    });

    alert("Internship deleted");

    // 🔥 AUTO UPDATE UI
    setInternships(internships.filter(i => i._id !== id));
    loadApplications();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right,#141e30,#243b55)"
    }}>

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
        className="form-control m-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="container">

        <h2 className="text-white text-center mb-4">
          Internship Applications
        </h2>

        {internships.map(internship => {

          const companyApps = applications.filter(
            a =>
              a.internshipId?._id === internship._id &&
              (a.studentId?.name || "")
                .toLowerCase()
                .includes(search.toLowerCase())
          );

          return (
            <div key={internship._id} className="mb-5">

              {/* TITLE */}
              <h4 style={{ textAlign: "center", color: "#fff" }}>
                {internship.title}
              </h4>

              <p style={{ textAlign: "center", color: "#ccc" }}>
                Total Applicants: {companyApps.length}
              </p>

              <p style={{ textAlign: "center", color: "#aaa" }}>
                Seats Left:
                {internship.maxApplicants
                  ? internship.maxApplicants - companyApps.length
                  : "No limit"}
                / {internship.maxApplicants || "∞"}
              </p>

              {/* 🔥 DELETE BUTTON */}
              <div className="text-center mb-3">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteInternship(internship._id)}
                >
                  🗑 Delete Internship
                </button>
              </div>

              {/* EXCEL */}
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

              {/* APPLICATIONS */}
              <div className="row">

                {companyApps.length > 0 ? (
                  companyApps.map(app => (
                    <div className="col-md-4 mb-4" key={app._id}>
                      <div className="card shadow p-3">

                        <p><b>Student:</b> {app.studentId?.name}</p>
                        <p><b>Email:</b> {app.studentId?.email}</p>

                        <p>
                          <b>Status:</b>
                          <span style={{
                            color:
                              app.status === "Approved"
                                ? "green"
                                : app.status === "Rejected"
                                ? "red"
                                : "orange",
                            fontWeight: "bold"
                          }}>
                            {" "}{app.status}
                          </span>
                        </p>

                        <div className="d-flex justify-content-between mb-2">

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

                        {/* RESUME */}
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
                          <button className="btn btn-secondary btn-sm w-100" disabled>
                            No Resume
                          </button>
                        )}

                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center", color: "#aaa" }}>
                    No students applied
                  </p>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default ViewApplications;