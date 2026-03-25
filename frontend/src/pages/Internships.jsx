import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

  const [internships, setInternships] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

  const loadInternships = () => {
    fetch("http://localhost:5000/api/internships")
      .then(res => res.json())
      .then(data => setInternships(data));
  
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(
  `http://localhost:5000/api/applications/student/${user._id}`
  )

  .then(res => res.json())

  .then(data => {

  const ids = data.map(app =>
  app.internshipId._id
  );

  setAppliedIds(ids);

  });

  };

  loadInternships();

  const timer = setInterval(() => {
    loadInternships();
  }, 1000);

  return () => clearInterval(timer);

}, []);
  const handleApply = async (internshipId) => {

    // const studentId = "699c337e2453cdc868a1878c";
    const student = JSON.parse(localStorage.getItem("user"));

  const studentId = student?._id;

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


 if (distance <= 0) {
  return "Closed";
 }


 const days =
 Math.floor(distance / (1000 * 60 * 60 * 24));

 const hours =
 Math.floor(
  (distance % (1000 * 60 * 60 * 24)) /
  (1000 * 60 * 60)
 );

 const minutes =
 Math.floor(
  (distance % (1000 * 60 * 60)) /
  (1000 * 60)
 );

 const seconds =
 Math.floor(
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

            const timeLeft =
            item.applicationDeadline
            ? getRemainingTime(item.applicationDeadline)
            : "Closed";

            const closed =
            timeLeft === "Closed";

            return (

              <div className="col-md-4 mb-4" key={item._id}>

                <div className="card shadow-lg p-3 h-100 border-0">

                  <h5 style={{
                    fontWeight:"600",
                    marginBottom:"10px"
                    }}>
                    {item.title}
                  </h5>

                  <p><b>Skills:</b> {item.requiredSkills.join(", ")}</p>

                  <p><b>Duration:</b> {item.duration}</p>
                  <p>

                  <b>Seats Left:</b>{" "}

                  {

                  item.maxApplicants
                  ? `${item.maxApplicants - (item.appliedCount || 0)} / ${item.maxApplicants}`

                  : "Unlimited"

                  }

                  </p>

                  {/* <p>

                    Deadline:

                    {getRemainingTime(item.applicationDeadline)}

                    </p> */}

                  
                    <p>

                <b>Deadline:</b>{" "}

                <span style={{

                color: closed ? "#ef4444" : "#22c55e",
                fontWeight:"500"

                }}>

                {timeLeft}

                </span>

                </p>

                 {/* <button

                  onClick={() => handleApply(item._id)}

                  disabled={closed}

                  className={
                  closed
                  ? "btn btn-secondary"
                  : "btn btn-primary"
                  }

                  >

                  {closed ? "Closed" : "Apply"}

                  </button> */}

                  <button

                    onClick={() => handleApply(item._id)}

                    disabled={

                    closed ||

                    appliedIds.includes(item._id)

                    }

                    className={

                    closed ||

                    appliedIds.includes(item._id)

                    ? "btn btn-secondary"

                    : "btn btn-primary"

                    }

                    >

                    {

                    closed
                    ? "Closed"

                    : appliedIds.includes(item._id)
                    ? "Already Applied"

                    : "Apply"

                    }

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