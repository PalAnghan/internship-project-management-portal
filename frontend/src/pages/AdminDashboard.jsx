import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

 const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/admin-login");
 };

 return (

 <div style={{
 minHeight:"100vh",
 background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
 paddingBottom:"50px"
 }}>

 {/* NAVBAR */}

 <nav style={{
 display:"flex",
 justifyContent:"space-between",
 alignItems:"center",
 padding:"15px 25px",
 background:"rgba(0,0,0,0.6)",
 backdropFilter:"blur(10px)",
 boxShadow:"0 4px 25px rgba(0,0,0,0.4)"
 }}>

 <h5 style={{color:"white",fontWeight:"600"}}>
 Admin Panel
 </h5>

 <div>

 <button className="btn btn-outline-light me-2"
 onClick={()=>navigate("/add-internship")}>
 Add Internship
 </button>

 <button className="btn btn-outline-light me-2"
 onClick={()=>navigate("/view-applications")}>
 Applications
 </button>

 <button className="btn btn-outline-info me-2"
 onClick={()=>navigate("/all-students")}>
 Students
 </button>

 <button className="btn btn-danger"
 onClick={handleLogout}>
 Logout
 </button>

 </div>

 </nav>


 {/* TITLE */}

 <div className="container mt-5">

 <h2 className="text-white text-center fw-bold mb-5">
 Admin Dashboard
 </h2>


 {/* CARDS */}

 <div className="row g-4 justify-content-center">


 {/* CARD COMPONENT */}
 {[
 {
 title:"Add Internship",
 desc:"Create new opportunity",
 btn:"Open",
 route:"/add-internship",
 color:"linear-gradient(135deg,#6366f1,#8b5cf6)"
 },
 {
 title:"Applications",
 desc:"Approve or reject",
 btn:"Open",
 route:"/view-applications",
 color:"linear-gradient(135deg,#22c55e,#4ade80)"
 },
 {
 title:"Students",
 desc:"View registered users",
 btn:"View",
 route:"/all-students",
 color:"linear-gradient(135deg,#f97316,#fb7185)"
 },
 {
 title:"Manage Internships",
 desc:"Edit or delete",
 btn:"Manage",
 route:"/admin-internships",
 color:"linear-gradient(135deg,#f59e0b,#eab308)"
 },
 {
 title:"Export Data",
 desc:"Download reports",
 btn:"Download",
 action:"export",
 color:"linear-gradient(135deg,#0ea5e9,#2563eb)"
 },
 {
 title:"Search Data",
 desc:"Find students or apps",
 btn:"Search",
 route:"/search",
 color:"linear-gradient(135deg,#a855f7,#d946ef)"
 }
 ].map((card,i)=>(

 <div className="col-md-4" key={i}>

 <div
 style={{
 borderRadius:"20px",
 padding:"25px",
 background:card.color,
 color:"white",
 boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
 transition:"0.3s",
 cursor:"pointer"
 }}
 onMouseEnter={e=>{
 e.currentTarget.style.transform="translateY(-10px)";
 }}
 onMouseLeave={e=>{
 e.currentTarget.style.transform="translateY(0)";
 }}
 >

 <h5 style={{fontWeight:"600"}}>
 {card.title}
 </h5>

 <p style={{opacity:"0.9",fontSize:"14px"}}>
 {card.desc}
 </p>

 <button
 className="btn btn-light w-100 mt-3"
 style={{
 borderRadius:"10px",
 fontWeight:"500"
 }}
 onClick={()=>{

 if(card.action==="export"){
 window.open("http://localhost:5000/api/export");
 }
 else{
 navigate(card.route);
 }

 }}
 >
 {card.btn}
 </button>

 </div>

 </div>

 ))}

 </div>

 </div>

 </div>

 );

}

export default AdminDashboard;