import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {

 const navigate = useNavigate();

 const [stats, setStats] = useState({

  total:0,
  approved:0,
  rejected:0,
  pending:0

 });


 const handleLogout = () => {

  localStorage.removeItem("user");

  navigate("/admin-login");

 };


 return(

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

 backdropFilter:"blur(10px)",

 boxShadow:
 "0 4px 25px rgba(0,0,0,0.4)"

 }}

 >

 <h5 className="text-white fw-bold">

 🛠 Admin Panel

 </h5>


 <div>

 <button

 className="btn btn-outline-light me-2"

 onClick={()=>navigate("/add-internship")}

 >

 ➕ Add Internship

 </button>


 <button

 className="btn btn-outline-light me-2"

 onClick={()=>navigate("/view-applications")}

 >

 📄 Applications

 </button>


 <button

 className="btn btn-outline-info me-2"

 onClick={()=>navigate("/all-students")}

 >

 🎓 Students

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

 className="text-white text-center fw-bold mb-5"

 >

 Admin Dashboard

 </h2>



 {/* ACTION CARDS */}

 <div className="row g-4 justify-content-center">



 {/* ADD INTERNSHIP */}

 <div className="col-md-4">

 <div

 className="p-4 text-center"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(135deg,#667eea,#764ba2)",

 color:"white",

 boxShadow:
 "0 20px 60px rgba(0,0,0,0.4)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"40px"}}>

 ➕

 </div>

 <h5 className="mt-3">

 Add Internship

 </h5>

 <p>

 create new opportunity

 </p>

 <button

 className="btn btn-light w-100"

 onClick={()=>navigate("/add-internship")}

 >

 Open

 </button>

 </div>

 </div>



 {/* APPLICATIONS */}

 <div className="col-md-4">

 <div

 className="p-4 text-center"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(135deg,#43e97b,#38f9d7)",

 color:"white",

 boxShadow:
 "0 20px 60px rgba(0,0,0,0.4)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"40px"}}>

 📄

 </div>

 <h5 className="mt-3">

 Applications

 </h5>

 <p>

 approve or reject

 </p>

 <button

 className="btn btn-light w-100"

 onClick={()=>navigate("/view-applications")}

 >

 Open

 </button>

 </div>

 </div>



 {/* STUDENTS */}

 <div className="col-md-4">

 <div

 className="p-4 text-center"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(135deg,#ff9966,#ff5e62)",

 color:"white",

 boxShadow:
 "0 20px 60px rgba(0,0,0,0.4)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"40px"}}>

 🎓

 </div>

 <h5 className="mt-3">

 Students

 </h5>

 <p>

 view registered users

 </p>

 <button

 className="btn btn-light w-100"

 onClick={()=>navigate("/all-students")}

 >

 View

 </button>

 </div>

 </div>



 {/* INTERNSHIPS */}

 <div className="col-md-4">

 <div

 className="p-4 text-center"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(135deg,#f7971e,#ffd200)",

 color:"white",

 boxShadow:
 "0 20px 60px rgba(0,0,0,0.4)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"40px"}}>

 💼

 </div>

 <h5 className="mt-3">

 Manage Internships

 </h5>

 <p>

 edit or delete internships

 </p>

 <button

 className="btn btn-light w-100"

 onClick={()=>navigate("/admin-internships")}

 >

 Manage

 </button>

 </div>

 </div>



 {/* EXPORT */}

 <div className="col-md-4">

 <div

 className="p-4 text-center"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(135deg,#00c6ff,#0072ff)",

 color:"white",

 boxShadow:
 "0 20px 60px rgba(0,0,0,0.4)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"40px"}}>

 📊

 </div>

 <h5 className="mt-3">

 Export Data

 </h5>

 <p>

 download excel report

 </p>

 <button

 className="btn btn-light w-100"

 onClick={()=>

 window.open(

 "http://localhost:5000/api/export"

 )

 }

 >

 Download

 </button>

 </div>

 </div>



 {/* SEARCH */}

 <div className="col-md-4">

 <div

 className="p-4 text-center"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(135deg,#7f00ff,#e100ff)",

 color:"white",

 boxShadow:
 "0 20px 60px rgba(0,0,0,0.4)",

 transition:"0.3s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)"

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0)"

 }}

 >

 <div style={{fontSize:"40px"}}>

 🔍

 </div>

 <h5 className="mt-3">

 Search Data

 </h5>

 <p>

 find students or apps

 </p>

 <button

 className="btn btn-light w-100"

 onClick={()=>navigate("/search")}

 >

 Search

 </button>

 </div>

 </div>



 </div>

 </div>

 </div>

 );

}

export default AdminDashboard;