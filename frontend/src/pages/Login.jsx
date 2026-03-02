import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  try {

    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {

      // ✅ SAVE USER IN LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      navigate("/student-dashboard");

    } else {
      alert(data.message || "Login failed");
    }

  } catch (error) {
    console.log(error);
    alert("Server error");
  }



  };  

  return (
    // <div style={{ padding: "20px" }}>
    //   <h2>Login</h2>

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

    //   <button onClick={handleLogin}>Login</button>

    //   <br /><br />

    //   <Link to="/register">Go to Register</Link>

    // </div>
    <div style={{
    minHeight: "100vh",
    background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif"
  }}>

    {/* ADD THIS CARD CONTAINER */}
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

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Student Login
      </h2>

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

      <button
        onClick={handleLogin}
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
        Login
      </button>

      <br /><br />

      <Link
        to="/register"
        style={{
          color: "#38bdf8",
          textDecoration: "none"
        }}
      >
        Go to Register
      </Link>
      <br />

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

export default Login;