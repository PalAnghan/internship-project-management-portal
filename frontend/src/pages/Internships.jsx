import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

  const [internships, setInternships] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  const navigate = useNavigate();

  // ✅ LOAD DATA
  useEffect(() => {
    fetchInternships();
    fetchApplied();
  }, []);

  // ✅ FETCH INTERNSHIPS
  const fetchInternships = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/internships");
      const data = await res.json();

      const now = new Date();

      const filtered = data.filter(item => {
        const end = new Date(item.applicationDeadline);
        return end > now;
      });

      setInternships(filtered);

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FETCH APPLIED INTERNSHIPS
  const fetchApplied = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/student/${user._id}`
      );

      const data = await res.json();

      const ids = data.map(app => app.internshipId._id);
      setAppliedIds(ids);

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ APPLY FUNCTION (FIXED JSON ERROR + INSTANT UPDATE)
 const handleApply = async (id) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user._id) {
    alert("Please login first");
    return;
  }

  try {

    const res = await fetch(
      "http://localhost:5000/api/applications/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: user._id,
          internshipId: id
        })
      }
    );

    // ✅ READ RESPONSE ONLY ONCE
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    if (!res.ok) {
      alert(data.message || "Apply failed");
      return;
    }

    // ✅ SUCCESS
    alert(data.message || "Applied Successfully 🎉");

    // ✅ INSTANT UPDATE
    setAppliedIds(prev => [...prev, id]);

    setInternships(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, appliedCount: (item.appliedCount || 0) + 1 }
          : item
      )
    );

  } catch (err) {
    console.error(err);
    alert("Server error - check backend");
  }
};
  // ✅ DEADLINE TIMER
  const getRemainingTime = (deadline) => {

    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;

    if (diff <= 0) return "Closed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return `${days}d ${hours}h`;
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)",
        paddingBottom: "40px"
      }}
    >

      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <h5 className="text-white">Student Portal</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/student-dashboard")}
        >
          🏠 Home
        </button>
      </nav>

      {/* CONTENT */}
      <div className="container pt-4">

        <h2 className="mb-4 text-white text-center">
          Available Internships
        </h2>

        <div className="row">

          {internships.length > 0 ? (

            internships.map(item => {

              const timeLeft = getRemainingTime(item.applicationDeadline);

              const alreadyApplied = appliedIds.includes(item._id);

              const seatsLeft = item.maxApplicants
                ? item.maxApplicants - (item.appliedCount || 0)
                : null;

              const isFull = seatsLeft !== null && seatsLeft <= 0;

              return (

                <div key={item._id} className="col-md-4 mb-3">

                  <div className="card shadow p-3">

                    <p><b>Company:</b> {item.companyName || "Not Provided"}</p>
                    <p><b>Address:</b> {item.companyAddress || "Not Provided"}</p>

                    <h5>{item.title}</h5>

                    <p>
  <b>Skills:</b>{" "}
  {Array.isArray(item.skills) && item.skills.length > 0
    ? item.skills.join(", ")
    : "Not Provided"}
</p>

                    <p><b>Duration:</b> {item.duration}</p>

                    <p>
                      <b>Seats Left:</b>{" "}
                      {item.maxApplicants ? seatsLeft : "No Limit"}
                    </p>

                    <p>
                      <b>Status:</b>{" "}
                      <span style={{ color: isFull ? "red" : "#22c55e" }}>
                        {isFull ? "Full" : "Open"}
                      </span>
                    </p>

                    <p>
                      <b>Deadline:</b>{" "}
                      <span style={{ color: "#22c55e" }}>
                        {timeLeft}
                      </span>
                    </p>

                    {/* APPLY BUTTON */}
                    <button
                      onClick={() => handleApply(item._id)}
                      disabled={alreadyApplied || isFull}
                      className={
                        alreadyApplied || isFull
                          ? "btn btn-secondary w-100"
                          : "btn btn-primary w-100"
                      }
                    >
                      {alreadyApplied
                        ? "Already Applied"
                        : isFull
                        ? "Full / Closed"
                        : "Apply"}
                    </button>

                  </div>

                </div>

              );

            })

          ) : (

            <h5 className="text-center text-white">
              No active internships available
            </h5>

          )}

        </div>

      </div>

    </div>
  );
}

export default Internships;