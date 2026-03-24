import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddInternship() {

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [skills, setSkills] = useState("");
  // const [duration, setDuration] = useState("");
  // const [deadline, setDeadline] = useState("");

  const [internship, setInternship] = useState({
  title: "",
  description: "",
  requiredSkills: "",
  duration: "",
  applicationDeadline: "",
  maxApplicants: ""
});

  const navigate = useNavigate();

  const handleSubmit = async () => {

    const res = await fetch("http://localhost:5000/api/internships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        title: internship.title,

        description: internship.description,

        requiredSkills:
        internship.requiredSkills
          .split(",")
          .map(skill => skill.trim()),

        duration: internship.duration,

        applicationDeadline:
        internship.applicationDeadline,

        maxApplicants:
        Number(internship.maxApplicants)

        }),
    });

    if (res.ok) {
      alert("Internship added successfully");
      navigate("/admin");
    } else {
      alert("Error adding internship");
    }

  };

  return (

    <div style={{ minHeight: "100vh", background: "linear-gradient(to right,#141e30,#243b55)" }}>

      <nav className="navbar navbar-dark bg-dark px-4">
        <h5 className="text-white">Admin Panel</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin")}
        >
          🏠 Home
        </button>
      </nav>

      <div className="container mt-5">

        <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>

          <h3 className="text-center mb-4">Add Internship</h3>

          <input
            className="form-control"
            placeholder="Internship Title"
            onChange={(e) =>
              setInternship({
                ...internship,
                title: e.target.value
              })
              }
          />
       

          <br />

          <textarea
            className="form-control"
            placeholder="Description"
            onChange={(e) =>
              setInternship({
                ...internship,
                description: e.target.value
              })
              }
          />

          <br />

          <input
            className="form-control"
            placeholder="Skills (comma separated)"
            onChange={(e) =>
              setInternship({
                ...internship,
                requiredSkills: e.target.value
              })
              }
          />

          <br />

          <input
            className="form-control"
            placeholder="Duration"

            onChange={(e) =>
              setInternship({
              ...internship,
              duration: e.target.value
              })
            }
            />

          <br />

          <label>Application Deadline</label>

          <input
            type="datetime-local"
            className="form-control"
            onChange={(e)=>

            setInternship({

              ...internship,
              applicationDeadline:e.target.value

            })

            }
/>

          <br />
          <input
          type="number"
          className="form-control"
          placeholder="Max students allowed"
          onChange={(e) =>
            setInternship({
              ...internship,
              maxApplicants: e.target.value
            })
          }
        />


          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            Add Internship
          </button>

        </div>
        
        <br/>

      </div>

    </div>
  );
}

export default AddInternship;