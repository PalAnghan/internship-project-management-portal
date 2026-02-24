import React, { useEffect, useState } from "react";

function Internships() {

  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/internships")
      .then(res => res.json())
      .then(data => setInternships(data));
  }, []);

  const handleApply = async (internshipId) => {

    const studentId = "699c337e2453cdc868a1878c"; // temporary

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
    <div style={{ padding: "20px" }}>
      <h2>Available Internships</h2>

      {internships.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>Skills: {item.requiredSkills.join(", ")}</p>

          {matchSkills(item.requiredSkills, ["react","javascript"]) && (
            <p style={{color:"green"}}>
              ⭐ Matched with your skills
            </p>
          )}

          <button onClick={() => handleApply(item._id)}>
            Apply
          </button>

        </div>
      ))}
    </div>
  );
}

export default Internships;