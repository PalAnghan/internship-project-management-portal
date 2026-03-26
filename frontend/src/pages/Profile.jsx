import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIX

function Profile() {

  const navigate = useNavigate(); // ✅ FIX

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    skills: user?.skills || "",
    bio: user?.bio || "",
    github: user?.github || "",
    linkedin: user?.linkedin || ""
  });

  const handleUpdate = async () => {

    await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Profile updated");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#141e30,#243b55)",
        paddingBottom: "40px"
      }}
    >

      <nav className="navbar navbar-dark bg-dark px-4">

        <h5 className="text-white">Student Portal</h5>

        <div>

          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/student-dashboard")}
          >
            🏠 Home
          </button>

        </div>

      </nav>

      <div className="container pt-5">

        <div
          className="card shadow p-4"
          style={{ maxWidth: "500px", margin: "auto" }}
        >

          <h2 className="text-center mb-3">Profile</h2>

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Skills"
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Bio"
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="GitHub"
            value={form.github}
            onChange={e => setForm({ ...form, github: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="LinkedIn"
            value={form.linkedin}
            onChange={e => setForm({ ...form, linkedin: e.target.value })}
          />

          <button
            className="btn btn-primary mt-2 w-100"
            onClick={handleUpdate}
          >
            Update Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;