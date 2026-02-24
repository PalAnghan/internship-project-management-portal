import React, { useState } from "react";

function AddInternship() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState("");

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

    const data = await res.json();

    if (res.ok) {
      alert("Internship added successfully");
    } else {
      alert("Error adding internship");
    }

  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Internship</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Skills (comma separated)"
        onChange={(e) => setSkills(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Duration"
        onChange={(e) => setDuration(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Add Internship
      </button>

    </div>
  );
}

export default AddInternship;