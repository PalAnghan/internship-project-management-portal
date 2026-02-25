import React, { useEffect, useState } from "react";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    // get logged-in user from localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
    }

  }, []);

  if (!user) {
    return <h2>No user logged in</h2>;
  }

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