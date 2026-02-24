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

  // ✅ correct place
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      <button onClick={() => navigate("/internships")}>
        View Internships
      </button>

      <br /><br />

      <button onClick={() => navigate("/my-applications")}>
        My Applications
      </button>

      <br /><br />

      <button onClick={() => navigate("/upload-resume")}>
        Upload Resume
      </button>

      <br /><br />

      <button onClick={() => navigate("/profile")}>
        Profile
      </button>

      <br /><br />

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default StudentDashboard;