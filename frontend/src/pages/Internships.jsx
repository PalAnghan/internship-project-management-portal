import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/internships")
      .then(res => res.json())
      .then(data => setInternships(data));
  }, []);

  const handleApply = async (internshipId) => {

    const studentId = "699c337e2453cdc868a1878c";

    await fetch("http://localhost:5000/api/applications/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        internshipId,
      }),
    });

    alert("Applied successfully");
  };

  const matchSkills = (requiredSkills, userSkills) => {

    if (!userSkills) return false;

    return requiredSkills.some(skill =>
      userSkills.includes(skill)
    );
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)"
      }}
    >

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Student Portal</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/student-dashboard")}
        >
          🏠 Home
        </button>

      </nav>


      {/* Page Title */}

      <div className="container mt-4">

        <h2 className="text-white text-center mb-4">
          Available Internships
        </h2>


        <div className="row">

          {internships.map((item) => (

            <div className="col-md-4 mb-4" key={item._id}>

              <div className="card shadow p-3">

                <h5>{item.title}</h5>

                <p>
                  <b>Required Skills:</b>
                  <br />
                  {item.requiredSkills.join(", ")}
                </p>


                {matchSkills(item.requiredSkills, ["react","javascript"]) && (

                  <p style={{ color: "green", fontWeight: "bold" }}>
                    ⭐ Matched with your skills
                  </p>

                )}


                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleApply(item._id)}
                >
                  Apply Internship
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Internships;