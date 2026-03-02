import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

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
    // <div style={{ padding: "20px" }}>
    //   <h2>Admin Login</h2>

    //   <input
    //     type="email"
    //     placeholder="Enter admin email"
    //     onChange={(e) => setEmail(e.target.value)}
    //   />

    //   <br /><br />

    //   <input
    //     type="password"
    //     placeholder="Enter password"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />

    //   <br /><br />

    //   <button onClick={handleLogin}>
    //     Admin Login
    //   </button>

    // </div>

    <div style={{
    minHeight: "100vh",
    background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif"
  }}>

    <div style={{
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "40px",
      width: "350px",
      color: "white",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
    }}>

      <h2 style={{
        textAlign: "center",
        marginBottom: "25px"
      }}>
         Admin Login
      </h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter admin email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "none",
          outline: "none"
        }}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "none",
          outline: "none"
        }}
      />

      {/* Login Button */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "30px",
          border: "none",
          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          color: "white",
          fontWeight: "600",
          boxShadow: "0 0 15px rgba(139,92,246,0.5)",
          cursor: "pointer"
        }}
      >
        Admin Login
      </button>

      <br />

      <Link
        to="/admin-register"
        style={{
          color: "#a78bfa",
          textDecoration: "none",
          display: "block",
          textAlign: "center",
          marginTop: "10px"
        }}
      >
        Not registered? Register as Admin
      </Link>


      <br /><br />

      {/* Back to Home */}
      <Link
        to="/"
        style={{
          color: "#94a3b8",
          textDecoration: "none",
          display: "block",
          textAlign: "center"
        }}
      >
        ← Back to Home
      </Link>

    </div>

  </div>
  );
}

export default AdminLogin;