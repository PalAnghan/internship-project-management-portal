import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminInternships() {

 const [internships, setInternships] = useState([]);
 const navigate = useNavigate();

 useEffect(()=>{

  fetchInternships();

 },[]);


 const fetchInternships = async()=>{

  try{

   const res = await axios.get(
   "http://localhost:5000/api/internships"
   );

   setInternships(res.data || []);

  }

  catch(err){

   console.log(err);

  }

 };


 const deleteInternship = async(id)=>{

  try{

   await axios.delete(
   `http://localhost:5000/api/internships/${id}`
   );

   fetchInternships();

  }

  catch(err){

   console.log(err);

  }

 };


 return(

<div style={{
 minHeight:"100vh",
 background:"linear-gradient(to right,#141e30,#243b55)",
 padding:"40px"
}}>

{/* HEADER */}

<div style={{
 display:"flex",
 justifyContent:"space-between",
 alignItems:"center",
 marginBottom:"30px"
}}>

<h2 style={{
 color:"white",
 fontWeight:"600"
}}>

Manage Internships

</h2>


<button
className="btn btn-light"
onClick={()=>navigate("/admin")}
>

⬅ Back

</button>

</div>



{/* INTERNSHIP CARDS */}

<div className="container">

<div className="row g-4">

{internships.map(internship => (

<div className="col-md-4" key={internship._id}>

<div style={{

 background:"white",

 borderRadius:"12px",

 padding:"20px",

 boxShadow:"0 6px 20px rgba(0,0,0,0.15)",

 height:"100%",

 display:"flex",

 flexDirection:"column",

 justifyContent:"space-between"

}}>


<div>

<h5 style={{
 fontWeight:"600",
 marginBottom:"10px"
}}>

{internship.title}

</h5>


<p style={{
 color:"#555",
 marginBottom:"5px"
}}>

🏢 {internship.company}

</p>


<p style={{
 fontSize:"14px",
 color:"#777"
}}>

📍 {internship.location || "Remote"}

</p>

</div>



<button
className="btn btn-danger mt-3"
onClick={()=>deleteInternship(internship._id)}
>

Delete

</button>


</div>

</div>

))}

</div>

</div>

</div>

);

}

export default AdminInternships;