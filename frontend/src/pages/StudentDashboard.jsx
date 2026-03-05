import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
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

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/student-dashboard")}
          >
            🏠 Home
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/internships")}
          >
            💼 Internships
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/my-applications")}
          >
            📄 Applications
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/upload-resume")}
          >
            ⬆ Upload Resume
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/profile")}
          >
            👤 Profile
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* Dashboard Cards */}

      <div className="container mt-5">

        <div className="row g-4">

          <div className="col-md-4">

            <div className="card shadow text-center p-4">

              <h5>View Internships</h5>

              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate("/internships")}
              >
                Open
              </button>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow text-center p-4">

              <h5>My Applications</h5>

              <button
                className="btn btn-success mt-2"
                onClick={() => navigate("/my-applications")}
              >
                Open
              </button>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow text-center p-4">

              <h5>Upload Resume</h5>

              <button
                className="btn btn-warning mt-2"
                onClick={() => navigate("/upload-resume")}
              >
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