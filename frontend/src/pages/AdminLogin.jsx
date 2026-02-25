import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const res = await fetch("http://localhost:5000/api/admins/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});

    const data = await res.json();

    if (res.ok && data.role === "admin") {
      alert("Admin login successful");
      navigate("/admin");
    } else {
      alert("Not an admin or invalid credentials");
    }

  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter admin email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Admin Login
      </button>

    </div>
  );
}

export default AdminLogin;