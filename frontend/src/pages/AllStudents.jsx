import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllStudents(){

 const [students,setStudents] = useState([]);
 const [search,setSearch] = useState("");

 const navigate = useNavigate();

 useEffect(()=>{

  fetch("http://localhost:5000/api/users")

  .then(res=>res.json())

  .then(data=>setStudents(data))

 },[]);


 const filtered = students.filter(s=>

 s.name?.toLowerCase().includes(search.toLowerCase()) ||

 s.email?.toLowerCase().includes(search.toLowerCase()) ||

 s.enrollmentNumber?.toLowerCase().includes(search.toLowerCase())

 );


 return(

 <div

 style={{

 minHeight:"100vh",

 background:
 "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

 paddingBottom:"40px"

 }}

 >

 {/* NAVBAR */}

 <nav

 className="navbar px-4"

 style={{

 background:"rgba(0,0,0,0.6)",

 backdropFilter:"blur(10px)"

 }}

 >

 <h5 className="text-white">

 🎓 All Students

 </h5>

 <button

 className="btn btn-outline-light"

 onClick={()=>navigate("/admin")}

 >

 Dashboard

 </button>

 </nav>



 {/* PAGE */}

 <div className="container mt-5">

 <h3 className="text-white text-center mb-4">

 Student Database

 </h3>


 {/* SEARCH */}

 <input

 className="form-control mb-4"

 placeholder="search name, email, enrollment..."

 value={search}

 onChange={e=>setSearch(e.target.value)}

 style={{

 borderRadius:"12px",

 padding:"12px",

 boxShadow:"0 5px 20px rgba(0,0,0,0.2)"

 }}

 />


 {/* TABLE */}

 <div

 style={{

 background:"rgba(255,255,255,0.95)",

 padding:"20px",

 borderRadius:"18px",

 boxShadow:"0 20px 50px rgba(0,0,0,0.25)"

 }}

 >

 <table className="table">

 <thead>

 <tr>

 <th>Name</th>

 <th>Email</th>

 <th>Enrollment</th>

 <th>Department</th>

 <th>Skills</th>

 <th>Resume</th>

 </tr>

 </thead>



 <tbody>

 {filtered.map(s=>(

 <tr key={s._id}>

 <td>{s.name}</td>

 <td>{s.email}</td>

 <td>{s.enrollment || "-"}</td>

 <td>{s.department || "-"}</td>

 <td>

 {s.skills?.join(", ") || "No Skills"}

 </td>



 <td>

 {s.resume ? (

 <>

 <a

 href={s.resume}

 target="_blank"

 className="btn btn-success btn-sm me-2"

 >

 View

 </a>

 <a

 href={s.resume}

 download

 className="btn btn-primary btn-sm"

 >

 Download

 </a>

 </>

 ) : (

 <span className="text-danger">

 No Resume

 </span>

 )}

 </td>

 </tr>

 ))}

 </tbody>

 </table>

 </div>

 </div>

 </div>

 );

}

export default AllStudents;