import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadResume() {

  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState("");

  const navigate = useNavigate();

  const handleUpload = async () => {

    const formData = new FormData();

    formData.append("resume", file);

    const user = JSON.parse(localStorage.getItem("user"));

    formData.append("userId", user._id);

    const res = await fetch("http://localhost:5000/api/users/upload-resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUploadedFile(data.filename);

    alert("Resume uploaded successfully");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Student Portal</h5>

        <div>

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
            onClick={() => navigate("/profile")}
          >
            👤 Profile
          </button>

        </div>

      </nav>


      {/* Upload Section */}

      <div className="container mt-5">

        <div
          className="card shadow p-4"
          style={{ maxWidth: "400px", margin: "auto" }}
        >

          <h3 className="text-center mb-3">
            Upload Resume
          </h3>

          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleUpload}
          >
            Upload Resume
          </button>

          {uploadedFile && (

            <div className="text-center mt-4">

              <p>Uploaded Resume</p>

              <img
                src={`http://localhost:5000/uploads/${uploadedFile}`}
                width="200"
                alt="resume"
              />

            </div>

          )}

        </div>

      </div>


      {/* Bottom Center Home Button */}

      <div style={{ textAlign: "center", marginBottom: "30px" }}>

        <button
          className="btn btn-light px-4"
          onClick={() => navigate("/student-dashboard")}
        >
          🏠 Back to Home
        </button>

      </div>

    </div>
  );
}

export default UploadResume;