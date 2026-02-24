import React, { useEffect, useState } from "react";

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {

    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUser(data[0]));

  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <h2>Student Profile</h2>

    <p><b>Name:</b> {user.name}</p>
    <p><b>Email:</b> {user.email}</p>
    <p><b>Role:</b> {user.role}</p>

    {user.resume && (
      <div>
        <p><b>Resume:</b></p>
        <img
          src={`http://localhost:5000/uploads/${user.resume}`}
          width="200"
          alt="resume"
        />
      </div>
    )}

  </div>
);
}

export default Profile;