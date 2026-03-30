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

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
   navigate("/login");
   return;
  }

  fetch(`http://localhost:5000/api/applications/student-stats/${user._id}`)
   .then(res => res.json())
   .then(data => setStats(data))
   .catch(err => console.log(err));

 }, []);

 const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
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
 boxShadow:"0 8px 25px rgba(0,0,0,0.4)"
 }}>

 <h5 style={{color:"white", fontWeight:"600"}}>
 Student Portal
 </h5>

 <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>

 {navBtn("Home", ()=>navigate("/student-dashboard"))}
 {navBtn("Internships", ()=>navigate("/internships"))}
 {navBtn("Applications", ()=>navigate("/my-applications"))}
 {navBtn("Resume", ()=>navigate("/upload-resume"))}
 {navBtn("Profile", ()=>navigate("/profile"))}

 <button
 onClick={handleLogout}
 style={{
 padding:"8px 14px",
 borderRadius:"8px",
 border:"none",
 background:"#ef4444",
 color:"white",
 fontWeight:"500"
 }}
 >
 Logout
 </button>

 </div>

 </nav>

 {/* TITLE */}
 <div className="container mt-5">

 <h2 style={{
 textAlign:"center",
 color:"white",
 marginBottom:"40px",
 fontWeight:"700",
 letterSpacing:"1px"
 }}>
 Dashboard Overview
 </h2>

 {/* STATS */}
 <div className="row g-4 text-center mb-5">

 <StatCard title="Total" value={stats.total} color="#6366f1" />
 <StatCard title="Approved" value={stats.approved} color="#22c55e" />
 <StatCard title="Rejected" value={stats.rejected} color="#ef4444" />
 <StatCard title="Pending" value={stats.pending} color="#f59e0b" />

 </div>

 {/* ACTION CARDS */}
 <div className="row g-4">

 <ActionCard
 title="Browse Internships"
 desc="Find best opportunities"
 btn="Explore"
 color="#3b82f6"
 onClick={()=>navigate("/internships")}
 />

 <ActionCard
 title="Track Applications"
 desc="Check status & updates"
 btn="View"
 color="#22c55e"
 onClick={()=>navigate("/my-applications")}
 />

 <ActionCard
 title="Upload Resume"
 desc="Improve matching system"
 btn="Upload"
 color="#f59e0b"
 onClick={()=>navigate("/upload-resume")}
 />

 </div>

 </div>

 </div>
 );
}

/* ================= COMPONENTS ================= */

const navBtn = (text, click)=>(
 <button
 onClick={click}
 style={{
 padding:"8px 14px",
 borderRadius:"8px",
 border:"1px solid rgba(255,255,255,0.2)",
 background:"transparent",
 color:"white",
 transition:"0.2s"
 }}
 onMouseEnter={e=>{
  e.currentTarget.style.background="rgba(255,255,255,0.1)";
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.background="transparent";
 }}
 >
 {text}
 </button>
);

const StatCard = ({title,value,color})=>(
 <div className="col-md-3">

 <div style={{
 padding:"25px",
 borderRadius:"20px",
 color:"white",
 background:`linear-gradient(135deg,${color},#0f172a)`,
 boxShadow:"0 20px 50px rgba(0,0,0,0.4)",
 transition:"0.3s"
 }}
 onMouseEnter={e=>{
  e.currentTarget.style.transform="translateY(-8px)";
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.transform="translateY(0)";
 }}
 >

 <h6 style={{opacity:"0.8"}}>{title}</h6>
 <h1 style={{fontWeight:"700"}}>{value}</h1>

 </div>

 </div>
);

const ActionCard = ({title,desc,btn,color,onClick})=>(
 <div className="col-md-4">

 <div style={{
 padding:"30px",
 borderRadius:"20px",
 background:"rgba(255,255,255,0.08)",
 backdropFilter:"blur(10px)",
 color:"white",
 textAlign:"center",
 boxShadow:"0 20px 50px rgba(0,0,0,0.4)",
 transition:"0.3s"
 }}
 onMouseEnter={e=>{
  e.currentTarget.style.transform="translateY(-8px)";
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.transform="translateY(0)";
 }}
 >

 <h5 style={{marginBottom:"10px"}}>{title}</h5>

 <p style={{color:"#cbd5f5"}}>{desc}</p>

 <button
 onClick={onClick}
 style={{
 width:"100%",
 padding:"10px",
 borderRadius:"10px",
 border:"none",
 marginTop:"10px",
 background:`linear-gradient(90deg,${color},#0ea5e9)`,
 color:"white",
 fontWeight:"600",
 boxShadow:"0 10px 25px rgba(0,0,0,0.3)"
 }}
 >
 {btn}
 </button>

 </div>

 </div>
);

export default StudentDashboard;