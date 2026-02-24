import React, { useEffect, useState } from "react";

function ViewApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const updateStatus = async (id, status) => {

    await fetch(`http://localhost:5000/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    alert("Status updated");

    // reload applications
    const res = await fetch("http://localhost:5000/api/applications");
    const data = await res.json();
    setApplications(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>View Applications</h2>

      {applications.map(app => (
        <div key={app._id}>
          <p><b>Student:</b> {app.studentId?.name}</p>
          <p><b>Internship:</b> {app.internshipId?.title}</p>
          <p><b>Status:</b> {app.status}</p>

          <button onClick={() => updateStatus(app._id, "Approved")}>
            Approve
          </button>

          <button onClick={() => updateStatus(app._id, "Rejected")}>
            Reject
          </button>

          <hr />
        </div>
      ))}

    </div>
  );
}

export default ViewApplications;