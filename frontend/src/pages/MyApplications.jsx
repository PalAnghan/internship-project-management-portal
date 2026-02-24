import React, { useEffect, useState } from "react";

function MyApplications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Applications</h2>

      {applications.map(app => (
        <div key={app._id}>
          <h3>{app.internshipId?.title}</h3>

          <p>Status: 
            <b style={{
              color:
                app.status === "Approved" ? "green" :
                app.status === "Rejected" ? "red" :
                "orange"
            }}>
              {" "}{app.status}
            </b>
          </p>

          <hr />
        </div>
      ))}

    </div>
  );
}

export default MyApplications;