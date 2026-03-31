import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyApplications() {

 const [applications, setApplications] = useState([]);

 const navigate = useNavigate();

 useEffect(() => {

  const user =
  JSON.parse(localStorage.getItem("user"));

  fetch(

   `https://internship-backend-yn3q.onrender.com/api/applications/student/${user._id}`

  )

  .then(res => res.json())

  .then(data => setApplications(data));

 }, []);



 return (

 <div

 style={{

 minHeight:"100vh",

 background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",
 paddingBottom:"50px"

 }}

 >

 {/* NAVBAR */}

 <nav

 className="navbar px-4"

 style={{

 background:"rgba(0,0,0,0.6)",

 backdropFilter:"blur(8px)",

 boxShadow:
 "0 4px 20px rgba(0,0,0,0.3)"

 }}

 >

 <h5 className="text-white fw-bold">

  My Applications

 </h5>


 <button

 className="btn btn-outline-light"

 onClick={() => navigate("/student-dashboard")}

 >

  Dashboard

 </button>

 </nav>



 {/* PAGE */}

 <div className="container mt-5">

 <h2

 className="text-center text-white fw-bold mb-4"

 >

 Application Status

 </h2>



 <div className="row g-4">

 {applications.map(app => (

 <div

 key={app._id}

 className="col-md-6"

 >

 {/* CARD */}

 <div

 className="p-4"

 style={{

 borderRadius:"18px",

 background:"rgba(255,255,255,0.95)",

 backdropFilter:"blur(10px)",

 boxShadow:
 "0 20px 50px rgba(0,0,0,0.25)",

 transition:"0.3s"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-6px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 {/* TITLE */}

 <h5 className="fw-bold">

 {app.internshipId?.title}

 </h5>



 {/* DATE */}

 <p className="text-muted mb-2">

 Applied on:

 {

 new Date(

 app.createdAt

 ).toLocaleDateString()

 }

 </p>



 {/* STATUS */}

 <div

 style={{

 padding:"6px 14px",

 borderRadius:"20px",

 display:"inline-block",

 fontWeight:"600",

 color:"white",

 marginBottom:"10px",

 background:

 app.status === "Approved"

 ? "linear-gradient(90deg,#00c853,#64dd17)"

 :

 app.status === "Rejected"

 ? "linear-gradient(90deg,#ff1744,#d50000)"

 :

 "linear-gradient(90deg,#ff9800,#ffc107)"

 }}

 >

 {app.status}

 </div>



 {/* ACTION */}

 {app.status !== "Approved" && (

 <button

 className="btn btn-danger w-100 mt-2"

 onClick={() => {

 if (!window.confirm("Withdraw application?"))

 return;

 fetch(

 `https://internship-backend-yn3q.onrender.com/api/applications/${app._id}`,

 {

 method:"DELETE"

 }

 )

 .then(() => {

 setApplications(

 applications.filter(

 a => a._id !== app._id

 )

 );

 });

 }}

 >

 Withdraw Application

 </button>

 )}



 {/* APPROVED MESSAGE */}

 {app.status === "Approved" && (

 <div

 style={{

 marginTop:"10px",

 padding:"10px",

 borderRadius:"10px",

 background:"#e8f5e9",

 color:"#2e7d32",

 fontWeight:"600",

 textAlign:"center"

 }}

 >

 🎉 Congratulations! Selected

 </div>

 )}

 </div>

 </div>

 ))}

 </div>



 {/* EMPTY STATE */}

 {applications.length === 0 && (

 <div

 className="text-center text-white mt-5"

 >

 <h5>

 No applications yet

 </h5>

 <button

 className="btn btn-light mt-2"

 onClick={() => navigate("/internships")}

 >

 Browse Internships

 </button>

 </div>

 )}

 </div>

 </div>

 );

}

export default MyApplications;