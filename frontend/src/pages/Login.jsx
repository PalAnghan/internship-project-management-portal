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
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <Link to="/register">Go to Register</Link>

    </div>
  );
}

export default Login;