import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    const res = await fetch("http://localhost:5000/api/admins/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "admin", // VERY IMPORTANT
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Admin registered successfully");
      navigate("/admin-login");
    } else {
      alert(data.message || "Error");
    }

  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register Admin
      </button>

    </div>
  );
}

export default AdminRegister;