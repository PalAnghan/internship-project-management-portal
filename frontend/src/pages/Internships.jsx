import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

  const loadInternships = () => {
    fetch("http://localhost:5000/api/internships")
      .then(res => res.json())
      .then(data => setInternships(data));
  };

  loadInternships();

  const timer = setInterval(() => {
    loadInternships();
  }, 1000);

  return () => clearInterval(timer);

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

 const getRemainingTime = (deadline) => {

  const now = new Date().getTime();
  const end = new Date(deadline).getTime();
  const distance = end - now;

  if (distance <= 0) return "Closed";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
  return (

    <div style={{ minHeight: "100vh", background: "linear-gradient(to right,#141e30,#243b55)" }}>

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Student Portal</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/student-dashboard")}
        >
          🏠 Home
        </button>

      </nav>

      <div className="container mt-4">

        <h2 className="text-white text-center mb-4">
          Available Internships
        </h2>

        <div className="row">

          {internships.map((item) => {

            const timeLeft = getRemainingTime(item.applicationDeadline);
            const closed = timeLeft === "Closed";

            return (

              <div className="col-md-4 mb-4" key={item._id}>

                <div className="card shadow p-3">

                  <h5>{item.title}</h5>

                  <p><b>Skills:</b> {item.requiredSkills.join(", ")}</p>

                  <p><b>Duration:</b> {item.duration}</p>

                  <p>
                    <b>Deadline:</b>{" "}
                    <span style={{ color: closed ? "red" : "green" }}>
                      {timeLeft}
                    </span>
                  </p>

                  <button
                    className="btn btn-primary mt-2"
                    disabled={closed}
                    onClick={() => handleApply(item._id)}
                  >
                    {closed ? "Closed" : "Apply Internship"}
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default Internships;