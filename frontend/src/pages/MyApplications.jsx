import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyApplications() {

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:5000/api/applications/student/${user._id}`) 
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

            <p>

            <b>Applied on:</b>{" "}

            {new Date(app.createdAt).toLocaleDateString()}

            </p>

            

            <button

              className="btn btn-danger btn-sm mt-2"

              onClick={()=>{

              fetch(

              `http://localhost:5000/api/applications/${app._id}`,

              {

              method:"DELETE"

              }

              )

              .then(()=>{

              setApplications(

              applications.filter(
              a => a._id !== app._id
              )

              );

              });

              }}

              >

              Withdraw

              </button>

          </div>
          

        ))}

      </div>

    </div>
  );
}

export default MyApplications;