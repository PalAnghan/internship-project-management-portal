import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllStudents() {

  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get("http://localhost:5000/api/admins/students")
      .then(res => {
        setStudents(res.data.students);
      })
      .catch(err => console.log(err));

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

        <h5 className="text-white">Admin Panel</h5>

        <div>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </button>

        </div>

      </nav>

      {/* Students Table */}

      <div className="container mt-5">

        <h2 className="text-center text-white mb-4">
          All Students
        </h2>

        <div className="card shadow p-4">

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Resume</th>
              </tr>
            </thead>

            <tbody>

              {students.map((s) => (

                <tr key={s._id}>

                  <td>{s.name}</td>

                  <td>{s.email}</td>

                  <td>
                    {s.Skills && s.Skills.length > 0
                      ? s.Skills.join(", ")
                      : "No Skills"}
                  </td>
                  <td>

                    {s.resume ? (
                        <a
                            className="btn btn-primary btn-sm"
                            href={`http://localhost:5000/${s.resume}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                          📄 Download
                        </a>
                    ) : (
                        <span className="text-danger">No Resume</span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AllStudents;