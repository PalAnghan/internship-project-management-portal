import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddInternship() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {

    const res = await fetch("http://localhost:5000/api/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        requiredSkills: skills.split(","),
        duration,
      }),
    });

    if (res.ok) {
      alert("Internship added successfully");
    } else {
      alert("Error adding internship");
    }

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

        <h5 className="text-white">Admin Panel</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin")}
        >
          🏠 Home
        </button>

      </nav>


      {/* Form */}

      <div className="container mt-5">

        <div
          className="card shadow p-4"
          style={{ maxWidth: "500px", margin: "auto" }}
        >

          <h3 className="text-center mb-4">Add Internship</h3>

          <input
            className="form-control"
            placeholder="Internship Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />

          <textarea
            className="form-control"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />

          <input
            className="form-control"
            placeholder="Skills (comma separated)"
            onChange={(e) => setSkills(e.target.value)}
          />

          <br />

          <input
            className="form-control"
            placeholder="Duration (ex: 3 Months)"
            onChange={(e) => setDuration(e.target.value)}
          />

          <br />

          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            Add Internship
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddInternship;