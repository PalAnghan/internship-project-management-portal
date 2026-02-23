import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();

  const goToInternships = () => {
    navigate("/internships");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      <button onClick={goToInternships}>
        View Internships
      </button>

      <button onClick={() => navigate("/my-applications")}>
        My Applications
      </button>

      <br /><br />

      <button onClick={() => navigate("/upload-resume")}>
        Upload Resume
      </button>

    </div>
  );
}

export default StudentDashboard;