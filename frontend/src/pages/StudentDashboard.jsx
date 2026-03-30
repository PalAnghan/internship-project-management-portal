import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

 const navigate = useNavigate();

 const [stats, setStats] = useState({

  total: 0,
  approved: 0,
  rejected: 0,
  pending: 0

 });

 useEffect(() => {

  const user =
  JSON.parse(localStorage.getItem("user"));

  if (!user) {

   navigate("/login");
   return;

  }

  fetch(

   `http://localhost:5000/api/applications/student-stats/${user._id}`

  )

  .then(res => res.json())

  .then(data => setStats(data))

  .catch(err => console.log(err));

 }, []);


 const handleLogout = () => {

  localStorage.removeItem("user");

  navigate("/login");

 };


 return (

 <div

 style={{

 minHeight:"100vh",

 background:
 "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

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

 🎓 Student Portal

 </h5>


 <div>

 <button

 className="btn btn-outline-light me-2"

 onClick={() => navigate("/student-dashboard")}

 >

 🏠 Home

 </button>


 <button

 className="btn btn-outline-light me-2"

 onClick={() => navigate("/internships")}

 >

 💼 Internships

 </button>


 <button

 className="btn btn-outline-light me-2"

 onClick={() => navigate("/my-applications")}

 >

 📄 Applications

 </button>


 <button

 className="btn btn-outline-light me-2"

 onClick={() => navigate("/upload-resume")}

 >

 ⬆ Resume

 </button>


 <button

 className="btn btn-outline-light me-2"

 onClick={() => navigate("/profile")}

 >

 👤 Profile

 </button>


 <button

 className="btn btn-danger"

 onClick={handleLogout}

 >

 Logout

 </button>

 </div>

 </nav>



 {/* TITLE */}

 <div className="container mt-5">

 <h2

 className="text-center text-white mb-4 fw-bold"

 >

 Dashboard Overview

 </h2>



 {/* STATS */}

 <div className="row g-4 mb-5 text-center">


 {/* TOTAL */}

 <div className="col-md-3">

 <div

 className="p-4"

 style={{

 borderRadius:"18px",

 color:"white",

 background:
 "linear-gradient(135deg,#667eea,#764ba2)",

 boxShadow:
 "0 15px 35px rgba(0,0,0,0.25)",

 transition:"0.3s"

 }}

 >

 <h6>Total Applications</h6>

 <h2>{stats.total}</h2>

 </div>

 </div>



 {/* APPROVED */}

 <div className="col-md-3">

 <div

 className="p-4"

 style={{

 borderRadius:"18px",

 color:"white",

 background:
 "linear-gradient(135deg,#43e97b,#38f9d7)",

 boxShadow:
 "0 15px 35px rgba(0,0,0,0.25)"

 }}

 >

 <h6>Approved</h6>

 <h2>{stats.approved}</h2>

 </div>

 </div>



 {/* REJECTED */}

 <div className="col-md-3">

 <div

 className="p-4"

 style={{

 borderRadius:"18px",

 color:"white",

 background:
 "linear-gradient(135deg,#ff416c,#ff4b2b)",

 boxShadow:
 "0 15px 35px rgba(0,0,0,0.25)"

 }}

 >

 <h6>Rejected</h6>

 <h2>{stats.rejected}</h2>

 </div>

 </div>



 {/* PENDING */}

 <div className="col-md-3">

 <div

 className="p-4"

 style={{

 borderRadius:"18px",

 color:"white",

 background:
 "linear-gradient(135deg,#f7971e,#ffd200)",

 boxShadow:
 "0 15px 35px rgba(0,0,0,0.25)"

 }}

 >

 <h6>Pending</h6>

 <h2>{stats.pending}</h2>

 </div>

 </div>

 </div>



 {/* ACTION CARDS */}

 <div className="row g-4">


 {/* INTERNSHIPS */}

 <div className="col-md-4">

 <div

 className="text-center p-4"

 style={{

 borderRadius:"18px",

 background:"rgba(255,255,255,0.95)",

 backdropFilter:"blur(10px)",

 boxShadow:
 "0 20px 50px rgba(0,0,0,0.25)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-6px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"35px"}}>

 💼

 </div>

 <h5 className="mt-2">

 Browse Internships

 </h5>

 <p className="text-muted">

 find best match using AI

 </p>

 <button

 className="btn btn-primary w-100"

 onClick={() => navigate("/internships")}

 >

 Open

 </button>

 </div>

 </div>



 {/* APPLICATIONS */}

 <div className="col-md-4">

 <div

 className="text-center p-4"

 style={{

 borderRadius:"18px",

 background:"rgba(255,255,255,0.95)",

 backdropFilter:"blur(10px)",

 boxShadow:
 "0 20px 50px rgba(0,0,0,0.25)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-6px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"35px"}}>

 📄

 </div>

 <h5 className="mt-2">

 Track Applications

 </h5>

 <p className="text-muted">

 see approval status

 </p>

 <button

 className="btn btn-success w-100"

 onClick={() => navigate("/my-applications")}

 >

 Open

 </button>

 </div>

 </div>



 {/* RESUME */}

 <div className="col-md-4">

 <div

 className="text-center p-4"

 style={{

 borderRadius:"18px",

 background:"rgba(255,255,255,0.95)",

 backdropFilter:"blur(10px)",

 boxShadow:
 "0 20px 50px rgba(0,0,0,0.25)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-6px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"35px"}}>

 ⬆

 </div>

 <h5 className="mt-2">

 Upload Resume

 </h5>

 <p className="text-muted">

 improve AI matching

 </p>

 <button

 className="btn btn-warning w-100"

 onClick={() => navigate("/upload-resume")}

 >

 Upload

 </button>

 </div>

 </div>



 </div>

 </div>

 </div>

 );

}

export default StudentDashboard;