import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      
      <h1>Internship Management Portal</h1>

      <br />

      <h2>Student Section</h2>

      <button onClick={() => navigate("/login")} >
        Student Login
      </button>

      <button onClick={() => navigate("/register")} style={{ marginLeft: "10px" }}>
        Student Register
      </button>

      <br /><br /><br />

      <h2>Admin Section</h2>

      <button onClick={() => navigate("/admin-login")}>
        Admin Login
      </button>

      <button onClick={() => navigate("/admin-register")} style={{ marginLeft: "10px" }}>
        Admin Register
      </button>

    </div>
  );
}

export default HomePage;