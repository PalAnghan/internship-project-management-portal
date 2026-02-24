import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/add-internship")}>
        Add Internship
      </button>

      <br /><br />

      <button onClick={() => navigate("/view-applications")}>
        View Applications
      </button>

    </div>
  );
}

export default AdminDashboard;