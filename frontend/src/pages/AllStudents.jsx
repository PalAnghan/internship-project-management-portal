import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllStudents() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    axios.get("http://localhost:5000/api/admins/students")
      .then(res => {
        setStudents(res.data.students);
      })
      .catch(err => console.log(err));

  }, []);

  // 🔍 Search filter
  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

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

        <h5 className="text-white">Admin Panel</h5>

        <div>
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </button>
        </div>

      </nav>

      {/* Content */}
      <div className="container mt-5">

        <h2 className="text-center text-white mb-4">
          All Students
        </h2>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="form-control mb-3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="card shadow p-4">

          <table className="table table-bordered table-striped text-center">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Resume</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (

                  <tr key={s._id}>

                    <td>{s.name}</td>

                    <td>{s.email}</td>

                    <td>
                      {s.skills && s.skills.length > 0
                        ? s.skills.join(", ")
                        : "No Skills"}
                    </td>

                    <td>
                      {s.resume ? (
                        <div className="d-flex justify-content-center gap-2">

                          {/* View */}
                          <a
                            className="btn btn-success btn-sm"
                            href={`http://localhost:5000/uploads/${s.resume}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            👁 View
                          </a>

                          {/* Download */}
                          <a
                            className="btn btn-primary btn-sm"
                            href={`http://localhost:5000/uploads/${s.resume}`}
                            download
                          >
                            📄 Download
                          </a>

                        </div>
                      ) : (
                        <span className="text-danger">No Resume</span>
                      )}
                    </td>

                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="4">No students found</td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AllStudents;