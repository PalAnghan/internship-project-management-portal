import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  if (!loggedUser) return;

  fetch(`http://localhost:5000/api/users/${loggedUser._id}`)
    .then(res => res.json())
    .then(data => setUser(data));

}, []);

  if (!user) {
    return <h2 style={{color:"white"}}>No user logged in</h2>;
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)"
      }}
    >

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Student Portal</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/student-dashboard")}
        >
          🏠 Home
        </button>

      </nav>


      {/* Profile Section */}

      <div className="container mt-5">

        <div
          className="card shadow p-4 text-center"
          style={{ maxWidth: "400px", margin: "auto" }}
        >

          <h3 className="mb-3">Student Profile</h3>

          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>


          {user.resume && (

  <div className="mt-3">

    <p><b>Resume</b></p>

    <a
      href={`http://localhost:5000/uploads/${user.resume}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
      View Resume
    </a>

  </div>

)}

        </div>

      </div>

    </div>
  );
}

export default Profile;