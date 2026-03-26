import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

  const [internships, setInternships] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  const navigate = useNavigate();


  // get internships + applied internships
  useEffect(() => {

    fetch("http://localhost:5000/api/internships")
      .then(res => res.json())
      .then(data => setInternships(data));

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){

      fetch(
        `http://localhost:5000/api/applications/student/${user._id}`
      )
      .then(res => res.json())
      .then(data => {

        const ids =
        data.map(app =>
          app.internshipId._id
        );

        setAppliedIds(ids);

      });

    }

  }, []);



  // apply function
  const handleApply = async(id) => {

    const user =
    JSON.parse(localStorage.getItem("user"));

    const res = await fetch(
      "http://localhost:5000/api/applications/apply",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          studentId:user._id,
          internshipId:id

        })
      }
    );

    alert(await res.text());

    window.location.reload();

  };



  // deadline timer
  const getRemainingTime = (deadline) => {

    const now = new Date();
    const end = new Date(deadline);

    const diff = end - now;

    if(diff <= 0){

      return "Closed";

    }

    const days =
    Math.floor(diff/(1000*60*60*24));

    const hours =
    Math.floor(

      (diff%(1000*60*60*24))/
      (1000*60*60)

    );

    return `${days}d ${hours}h`;

  };



  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        Available Internships
      </h2>


      <div className="row">

        {internships.map(item => {

          const timeLeft =
          getRemainingTime(
            item.applicationDeadline
          );

          const closed =
          timeLeft === "Closed";

          const alreadyApplied =
          appliedIds.includes(item._id);


          return(

            <div
              key={item._id}
              className="col-md-4 mb-3"
            >

              <div className="card shadow p-3">

                <h5>
                  {item.title}
                </h5>


                <p>

                  <b>Skills:</b>{" "}

                  {item.requiredSkills?.join(", ")}

                </p>


                <p>

                  <b>Duration:</b>{" "}

                  {item.duration}

                </p>


                <p>

                  <b>Seats Left:</b>{" "}

                  {item.maxApplicants}

                </p>


                <p>

                  <b>Deadline:</b>{" "}

                  <span

                    style={{

                      color:
                      closed
                      ? "#ef4444"
                      : "#22c55e",

                      fontWeight:"500"

                    }}

                  >

                    {timeLeft}

                  </span>

                </p>



                <button

                  onClick={() =>
                  handleApply(item._id)
                  }

                  disabled={
                    closed ||
                    alreadyApplied
                  }

                  className={
                    closed ||
                    alreadyApplied

                    ? "btn btn-secondary"

                    : "btn btn-primary"
                  }

                >

                  {

                    closed

                    ? "Closed"

                    : alreadyApplied

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

  );

}

export default Internships;