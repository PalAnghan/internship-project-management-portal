import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department,setDepartment] = useState("");

  const handleRegister = async () => {

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, department  }),
    });

    const data = await response.json();

    alert("User registered successfully");

    navigate("/login");
  };

  return (
    // <div style={{ padding: "20px" }}>
    //   <h2>Register</h2>

    //   <input
    //     type="text"
    //     placeholder="Enter name"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //   /><br /><br />

    //   <input
    //     type="email"
    //     placeholder="Enter email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   /><br /><br />

    //   <input
    //     type="password"
    //     placeholder="Enter password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   /><br /><br />

    //   <button onClick={handleRegister}>Register</button>

    //   <br /><br />

    //   <Link to="/login">Go to Login</Link>

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
        Student Register
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "none",
          outline: "none"
        }}
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
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
        value={password}
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

      {/* Register Button */}
      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "30px",
          border: "none",
          background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
          color: "white",
          fontWeight: "600",
          boxShadow: "0 0 15px rgba(59,130,246,0.5)",
          cursor: "pointer"
        }}
      >
        Register
      </button>

      <select
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}
        >

        <option value="">Select Department</option>

        <option value="BCA">BCA</option>

        <option value="B.Tech">B.Tech</option>

        <option value="BBA">BBA</option>

        <option value="Pharmacy">Pharmacy</option>

        <option value="Robotics">Robotics</option>

        </select>

      <br /><br />

      {/* Login Link */}
      <Link
        to="/login"
        style={{
          color: "#38bdf8",
          textDecoration: "none"
        }}
      >
        Go to Login
      </Link>

      <br />

      {/* Back to Home */}
      <Link
        to="/"
        style={{
          color: "#94a3b8",
          textDecoration: "none",
          display: "block",
          marginTop: "10px"
        }}
      >
        ← Back to Home
      </Link>

    </div>

  </div>
  );
}

export default Register;