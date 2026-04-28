import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminRegister() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    setLoading(true);

    try {

      const res = await fetch("https://internship-backend-yn3q.onrender.com/api/admins/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "admin"
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/admin-login");
      } else {
        alert(data.message || "Error");
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (

    <div style={styles.container}>

      {/* 🔥 TOP TITLE */}
      <h1 style={styles.mainTitle}>
        Internship Management Portal
      </h1>

      {/* ANIMATION */}
      <style>
        {`
        @keyframes fadeIn {
          from {
            opacity:0;
            transform:translateY(30px);
          }
          to {
            opacity:1;
            transform:translateY(0);
          }
        }
        `}
      </style>

      {/* CARD */}
      <div style={styles.card}>

        <h2 style={styles.title}>Admin Register</h2>

        {/* NAME */}
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={inputStyle}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* PASSWORD */}
        <div style={{ position: "relative", marginBottom: "15px" }}>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={()=>setShowPassword(!showPassword)}
            style={styles.showBtn}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          style={styles.btn}
        >
          {loading ? "Please wait..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <div style={styles.centerText}>
          <Link to="/admin-login" style={styles.link}>
            Already have account? Login
          </Link>
        </div>

        {/* BACK */}
        <div style={styles.centerText}>
          <Link to="/" style={styles.backLink}>
            Back to home
          </Link>
        </div>

      </div>

    </div>
  );
}

export default AdminRegister;





/* ================= STYLES ================= */

const styles = {

  container: {
  minHeight: "100vh",
  background: "linear-gradient(120deg,#0f172a,#1e293b,#020617)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",   // 🔥 change from center → top
  alignItems: "center",
  fontFamily: "Poppins, sans-serif",
  paddingTop: "60px"              // 🔥 push content down nicely
  },

  mainTitle: {
     color: "white",
  fontSize: "34px",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: "40px" 
  },

  card: {
    width: "370px",
    padding: "35px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    animation: "fadeIn 0.6s ease"
  },

  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "25px",
    fontWeight: "600"
  },

  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    marginTop: "10px",
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(99,102,241,0.4)"
  },

  showBtn: {
    position:"absolute",
    right:"10px",
    top:"50%",
    transform:"translateY(-50%)",
    background:"transparent",
    border:"none",
    color:"#cbd5f5",
    cursor:"pointer",
    fontSize:"12px"
  },

  centerText: {
    marginTop:"15px",
    textAlign:"center"
  },

  link: {
    color:"#a78bfa",
    textDecoration:"none",
    fontSize:"14px"
  },

  backLink: {
    color:"#94a3b8",
    textDecoration:"none",
    fontSize:"13px"
  }

};


/* INPUT STYLE */
const inputStyle = {
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"12px",
  border:"1px solid rgba(255,255,255,0.1)",
  background:"rgba(255,255,255,0.1)",
  color:"white",
  outline:"none"
};