import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {

  const navigate = useNavigate();

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins, sans-serif"
    }}>

      <div className="container text-center">

        {/* Title */}
        <h1 style={{
          color: "white",
          fontWeight: "700",
          marginBottom: "50px",
          letterSpacing: "1px"
        }}>
          Internship Management Portal
        </h1>

        <div className="row justify-content-center">

          {/* Student Card */}
          <div className="col-md-4 m-3">

            <div style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "35px",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}>

              <h3 style={{ marginBottom: "25px" }}>
                 Student Portal
              </h3>

              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "30px",
                  border: "none",
                  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  color: "white",
                  fontWeight: "600",
                  marginBottom: "15px",
                  boxShadow: "0 0 15px rgba(59,130,246,0.5)"
                }}
              >
                Student Login
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "30px",
                  border: "1px solid #3b82f6",
                  background: "transparent",
                  color: "#3b82f6",
                  fontWeight: "600"
                }}
              >
                Student Register
              </button>

            </div>

          </div>

          {/* Admin Card */}
          <div className="col-md-4 m-3">

            <div style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "35px",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}>

              <h3 style={{ marginBottom: "25px" }}>
                Admin Portal
              </h3>

              <button
                onClick={() => navigate("/admin-login")}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "30px",
                  border: "none",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  color: "white",
                  fontWeight: "600",
                  marginBottom: "15px",
                  boxShadow: "0 0 15px rgba(139,92,246,0.5)"
                }}
              >
                Admin Login
              </button>

              <button
                onClick={() => navigate("/admin-register")}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "30px",
                  border: "1px solid #8b5cf6",
                  background: "transparent",
                  color: "#8b5cf6",
                  fontWeight: "600"
                }}
              >
                Admin Register
              </button>

              <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/")}
              >
                Home
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default HomePage;