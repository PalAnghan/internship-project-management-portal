import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExportData(){

 const navigate = useNavigate();

 const [internships,setInternships] = useState([]);
 const [search,setSearch] = useState("");
 const [results,setResults] = useState([]);


 // load companies
 useEffect(()=>{

  axios.get("http://localhost:5000/api/internships")

  .then(res=>{

   const data = res.data.reverse();

   setInternships(data);

   // show all companies by default
   setResults(data);

  })

  .catch(err=>console.log(err));

 },[]);



 // search click
 const handleSearch = ()=>{

  if(search.trim()===""){

   setResults(internships);

  }

  else{

   const filtered =
   internships.filter(item=>

    item.companyName
    ?.toLowerCase()
    .includes(search.toLowerCase())

   );

   setResults(filtered);

  }

 };



 // search typing (live search)
 const handleTyping = (value)=>{

  setSearch(value);

  if(value.trim()===""){

   setResults(internships);

  }

  else{

   const filtered =
   internships.filter(item=>

    item.companyName
    ?.toLowerCase()
    .includes(value.toLowerCase())

   );

   setResults(filtered);

  }

 };



 // excel download
 const downloadAllExcel = ()=>{

  window.open(
   "http://localhost:5000/api/export"
  );

 };



 const downloadCompanyExcel = (id)=>{

  window.open(
   `http://localhost:5000/api/export/company/${id}`
  );

 };



 return(

 <div style={{
  minHeight:"100vh",
  background:"linear-gradient(135deg,#0f172a,#1e293b)",
  padding:"40px"
 }}>



 <div className="container">




 <h2 style={{
  color:"white",
  textAlign:"center",
  fontWeight:"600"
 }}>

 Export Student Data

 </h2>



 <p style={{
  color:"#cbd5e1",
  textAlign:"center",
  marginBottom:"30px"
 }}>

 Download students data in Excel format

 </p>




 {/* ALL STUDENTS */}

 <div style={mainCard}>

 <h5>📊 All Students Data</h5>

 <button
 className="btn btn-dark mt-2 px-4"
 onClick={downloadAllExcel}
 >

 Download Excel

 </button>

 </div>




 {/* SEARCH */}

 <div style={{
  textAlign:"center",
  marginTop:"40px"
 }}>

 <input
 type="text"
 placeholder="Search company..."
 value={search}
 onChange={(e)=>handleTyping(e.target.value)}
 style={{
  padding:"12px",
  width:"260px",
  borderRadius:"8px",
  border:"1px solid #ddd",
  marginRight:"10px"
 }}
 />

 <button
 className="btn btn-primary"
 onClick={handleSearch}
 >

 Search

 </button>

 </div>




 {/* COMPANY LIST */}

 <h4 style={{
  color:"white",
  marginTop:"35px",
  textAlign:"center"
 }}>

 Company Wise Export

 </h4>



 <div className="row g-4 mt-2">

 {results.length===0 ? (

 <p style={{
  color:"lightgray",
  textAlign:"center"
 }}>

 No company found

 </p>

 ):(

 results.map(internship=>(

 <div
 className="col-md-4"
 key={internship._id}
 >

 <div style={companyCard}>

 <h5 style={{fontWeight:"600"}}>
 {internship.companyName}
 </h5>

 <p style={{
  color:"#555",
  fontSize:"14px"
 }}>
 {internship.title}
 </p>

 <button
 className="btn btn-primary w-100 mt-2"
 onClick={()=>
 downloadCompanyExcel(internship._id)
 }
 >

 Download Excel

 </button>

 </div>

 </div>

 ))

 )}

 </div>




 <div style={{
  textAlign:"center",
  marginTop:"40px"
 }}>

 <button
 className="btn btn-light px-4"
 onClick={()=>navigate("/admin")}
 >

 Back

 </button>

 </div>



 </div>

 </div>

 );

}



const mainCard={

 background:"white",
 padding:"25px",
 borderRadius:"14px",
 textAlign:"center",
 maxWidth:"500px",
 margin:"auto",
 boxShadow:"0 10px 25px rgba(0,0,0,0.25)"

};



const companyCard={

 background:"white",
 padding:"20px",
 borderRadius:"12px",
 textAlign:"center",
 boxShadow:"0 8px 20px rgba(0,0,0,0.2)"

};


export default ExportData;