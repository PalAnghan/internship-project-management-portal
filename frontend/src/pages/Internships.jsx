import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

  
  const [appliedIds, setAppliedIds] = useState([]);

  const [internships,setInternships] = useState([]);

  const user =
  JSON.parse(localStorage.getItem("user"));

 const studentSkills =
(user?.skills || []).map(
s => s.toLowerCase().trim()
);

  const sortedInternships =
  [...internships].sort(
  (a,b)=>
  (b.matchScore || 0) -
  (a.matchScore || 0)
  );



  const navigate = useNavigate();

  // ✅ LOAD DATA
  useEffect(() => {
    fetchInternships();
    fetchApplied();
  }, []);

  // ✅ FETCH INTERNSHIPS
 const fetchInternships = async () => {

try {

const res = await fetch(
`http://localhost:5000/api/internships?studentId=${user._id}`
);

const data = await res.json();

const now = new Date();

const filtered = data.filter(item => {

const end =
new Date(item.applicationDeadline);

return end > now;

});

setInternships(filtered);

}
catch(err){

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
           Home
        </button>
      </nav>

      {/* CONTENT */}
      <div className="container pt-4">

        <h2 className="mb-4 text-white text-center">
          Available Internships
        </h2>

        <div className="row">

          {internships.length > 0 ? (

            sortedInternships.map(item =>  {

              const timeLeft = getRemainingTime(item.applicationDeadline);
              
              const isClosed = timeLeft === "Closed";


              const alreadyApplied = appliedIds.includes(item._id);

              const seatsLeft = item.maxApplicants
                ? item.maxApplicants - (item.appliedCount || 0)
                : null;

              const isFull = seatsLeft !== null && seatsLeft <= 0;

              return (

<div key={item._id} className="col-md-4 mb-4">

<div
className="card shadow-lg border-0 h-100"
style={{
borderRadius: "14px",
transition: "0.2s",
background:"#ffffff"
}}
>

<div className="card-body d-flex flex-column">

  <span
className="badge bg-success mb-2"
>

{item.matchScore}% Match

</span>

<div className="progress mb-2">

<div

className="progress-bar bg-success"

style={{

width:

`${item.matchScore}%`

}}

>

{item.matchScore}%

</div>

</div>



{/* TITLE */}

<h5
className="text-center mb-3"
style={{
fontWeight:"600",
color:"#1e293b"
}}
>

{item.title}

</h5>


{/* COMPANY */}

<p className="mb-1">

<b> Company:</b><br/>

<span style={{color:"#334155"}}>

{item.companyName || "Not Provided"}

</span>

</p>


{/* ADDRESS */}

<p className="mb-1">

<b> Location:</b><br/>

<span style={{color:"#334155"}}>

{item.companyAddress || "Not Provided"}

</span>

</p>



{/* SKILLS */}

<div className="mb-2">

<b> Skills:</b>

<div className="mt-1">

{
item.requiredSkills?.length
? item.requiredSkills.map((skill,i)=>(

<span
key={i}
className="badge bg-primary me-1 mb-1"
>

{skill}

</span>

))

: <span className="text-muted">Not Provided</span>
}

</div>

</div>


<p>

<b>Applications:</b>

{item.applications?.length || 0}

</p>


{/* DURATION */}

<p className="mb-1">

<b> Duration:</b>

<span style={{color:"#334155"}}>

{item.duration}

</span>

</p>


{/* SEATS */}

<p className="mb-1">

<b>Seats Left:</b>

<span style={{color:"#334155"}}>

{

seatsLeft !== null
? seatsLeft
: "No Limit"

}

</span>

</p>


{/* STATUS */}

<p className="mb-1">

<b> Status:</b>

<span

style={{

color: isFull
? "#ef4444"
: "#22c55e",

fontWeight:"600"

}}

>

{

isFull
? "Full"
: "Open"

}

</span>

</p>


{/* DEADLINE */}

<p className="mb-3">

<b> Deadline:</b>

<span

style={{

color: isClosed
? "#ef4444"
: "#22c55e",

fontWeight:"600"

}}

>

{timeLeft}

</span>

</p>

<p>

<b>Matched:</b>{" "}

{

item.requiredSkills
?.map(skill => skill.toLowerCase().trim())

.filter(skill =>

studentSkills.includes(skill)

)

.join(", ")

|| "None"

}

</p>
<p>

<b>Missing:</b>{" "}

{

item.requiredSkills
?.map(skill => skill.toLowerCase().trim())

.filter(skill =>

!studentSkills.includes(skill)

)

.join(", ")

|| "None"

}

</p>


{/* BUTTON */}

<button

onClick={() =>
handleApply(item._id)
}

disabled={
isClosed ||
alreadyApplied ||
isFull
}

className={

isClosed ||
alreadyApplied ||
isFull

? "btn btn-secondary w-100"

: "btn btn-primary w-100"

}

style={{
borderRadius:"8px",
fontWeight:"500"
}}

>

{

isClosed
? "Closed"

: isFull  
? "Full"

: alreadyApplied
? "Already Applied"

: "Apply Now"

}

</button>

</div>

</div>

</div>

);
})
) : (

<p className="text-white text-center">
No internships available
</p>

)}

</div>
</div>

</div>

);
}

export default Internships;