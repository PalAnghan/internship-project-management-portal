import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddInternship(){

const navigate = useNavigate();

const [form,setForm] = useState({

companyWebsite:"",
companyDescription:"",
industryType:"",

stipend:"",
internshipType:"",
experience:"",
perks:"",
selectionProcess:"",

logo:null,
pdf:null

});

const [internship,setInternship] = useState({

title:"",
description:"",
requiredSkills:"",
duration:"",
applicationDeadline:"",
maxApplicants:"",
companyName:"",
companyAddress:""

});

const [department,setDepartment] = useState([]);

/* ================= DEPARTMENT ================= */

const handleDepartmentChange = (e)=>{

const value = e.target.value;

if(e.target.checked){

setDepartment(prev => [...prev,value]);

}

else{

setDepartment(prev => prev.filter(dep => dep !== value));

}

};

/* ================= SUBMIT ================= */
const handleSubmit = async () => {

 try{

 const formData = new FormData();

 formData.append("title", internship.title);
 formData.append("description", internship.description);
 formData.append("duration", internship.duration);
 formData.append("applicationDeadline", internship.applicationDeadline);
 formData.append("maxApplicants", internship.maxApplicants);

 formData.append("companyName", internship.companyName);
 formData.append("companyAddress", internship.companyAddress);

 internship.requiredSkills
 .split(",")
 .map(s=>s.trim())
 .forEach(skill=>{
  formData.append("requiredSkills[]", skill);
 });

 formData.append("companyWebsite", form.companyWebsite);
 formData.append("companyDescription", form.companyDescription);
 formData.append("industryType", form.industryType);

 formData.append("stipend", form.stipend);
 formData.append("internshipType", form.internshipType);
 formData.append("experience", form.experience);
 formData.append("perks", form.perks);
 formData.append("selectionProcess", form.selectionProcess);

 if(form.logo){
  formData.append("logo", form.logo);
 }

 if(form.pdf){
  formData.append("pdf", form.pdf);
 }

 department.forEach(dep=>{
  formData.append("department", dep);
 });

const res = await fetch(
"https://internship-backend-yn3q.onrender.com/api/internships",
{
 method:"POST",
 body: formData
}
);  
 

 if(res.ok){

 alert("Internship added successfully");

 navigate("/admin-internships");

 }
 else{

 alert("Error adding internship");

 }

 }
 catch(err){

 console.log(err);

 alert("Server error");

 }

};
/* ================= UI ================= */

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
paddingBottom:"50px"
}}>

{/* NAVBAR */}

<nav style={{
display:"flex",
justifyContent:"space-between",
padding:"15px 25px",
background:"rgba(0,0,0,0.6)",
backdropFilter:"blur(10px)"
}}>

<h5 style={{color:"white"}}>Admin Panel</h5>

<button
className="btn btn-outline-light"
onClick={()=>navigate("/admin")}
>
Home
</button>

</nav>


<div className="container mt-5">

<div style={{
maxWidth:"700px",
margin:"auto",
borderRadius:"20px",
background:"rgba(255,255,255,0.95)",
padding:"30px",
boxShadow:"0 25px 70px rgba(0,0,0,0.4)"
}}>

<h3 className="text-center fw-bold mb-4">
Add Internship
</h3>


<input
type="text"
placeholder="Company Website (optional)"
className="form-control"
onChange={(e)=>
setForm({...form,companyWebsite:e.target.value})
}
/>

<textarea
placeholder="Company Description"
className="form-control"
onChange={(e)=>
setForm({...form,companyDescription:e.target.value})
}
/>

<select
className="form-control"
onChange={(e)=>
setForm({...form,industryType:e.target.value})
}
>
<option value="">Industry Type</option>
<option>IT</option>
<option>Finance</option>
<option>Healthcare</option>
<option>Marketing</option>
<option>Education</option>
<option>Startup</option>
</select>






{/* GRID FORM */}

<div className="row">

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Company Name"
onChange={(e)=>setInternship({...internship,companyName:e.target.value})}
/>
</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Company Address"
onChange={(e)=>setInternship({...internship,companyAddress:e.target.value})}
/>
</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Internship Title"
onChange={(e)=>setInternship({...internship,title:e.target.value})}
/>
</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Duration (e.g. 3 months)"
onChange={(e)=>setInternship({...internship,duration:e.target.value})}
/>
</div>

</div>

<select
className="form-control"
onChange={(e)=>
setForm({...form,internshipType:e.target.value})
}
>
<option value="">Internship Type</option>
<option>Remote</option>
<option>On-site</option>
<option>Hybrid</option>
</select>

<input
type="text"
placeholder="Stipend (₹5000/month)"
className="form-control"
onChange={(e)=>
setForm({...form,stipend:e.target.value})
}
/>

<select
className="form-control"
onChange={(e)=>
setForm({...form,experience:e.target.value})
}
>
<option value="">Required Experience</option>
<option>Fresher</option>
<option>0-1 years</option>
<option>Basic knowledge required</option>
</select>

<input
type="text"
placeholder="Perks (certificate, job offer)"
className="form-control"
onChange={(e)=>
setForm({...form,perks:e.target.value})
}
/>

<input
type="text"
placeholder="Selection Process (HR interview)"
className="form-control"
onChange={(e)=>
setForm({...form,selectionProcess:e.target.value})
}
/>


<label>Company Logo</label>

<input
type="file"
accept="image/*"
onChange={(e)=>
setForm({...form,logo:e.target.files[0]})
}
/>

<label>Company PDF</label>

<input
type="file"
accept=".pdf"
onChange={(e)=>
setForm({...form,pdf:e.target.files[0]})
}
/>


{/* DESCRIPTION */}

<textarea
className="form-control mb-3"
placeholder="Description"
rows="3"
onChange={(e)=>setInternship({...internship,description:e.target.value})}
/>


{/* SKILLS */}

<input
className="form-control mb-3"
placeholder="Skills (comma separated)"
onChange={(e)=>setInternship({...internship,requiredSkills:e.target.value})}
/>


{/* DEADLINE + MAX */}

<div className="row">

<div className="col-md-6">
<label className="fw-semibold">Application Deadline</label>
<input
type="datetime-local"
className="form-control mb-3"
onChange={(e)=>setInternship({...internship,applicationDeadline:e.target.value})}
/>
</div>

<div className="col-md-6">
<label className="fw-semibold">Max Students</label>
<input
type="number"
className="form-control mb-3"
onChange={(e)=>setInternship({...internship,maxApplicants:e.target.value})}
/>
</div>

</div>






{/* DEPARTMENT */}

<h5 className="mt-3 mb-2">Select Department</h5>

<div className="row">

{["BCA","B.Tech","Diploma","BBA","Pharmacy","Robotics"].map(dep=>(

<div className="col-md-4 mb-2" key={dep}>

<label style={{
display:"block",
padding:"10px",
borderRadius:"10px",
border:"1px solid #ddd",
cursor:"pointer",
background:
department.includes(dep)
? "#e0f2fe"
: "#f8fafc",
fontWeight:"500"
}}>

<input
type="checkbox"
value={dep}
className="form-check-input me-2"
onChange={handleDepartmentChange}
/>

{dep}

</label>

</div>

))}

</div>


{/* SELECTED */}

<p className="mt-2 text-muted">
Selected: {department.join(", ") || "None"}
</p>


{/* BUTTON */}

<button
className="btn w-100 mt-3"
style={{
background:"linear-gradient(90deg,#3b82f6,#2563eb)",
color:"white",
padding:"12px",
borderRadius:"12px",
fontWeight:"600",
boxShadow:"0 10px 30px rgba(59,130,246,0.4)"
}}
onClick={handleSubmit}
>

Add Internship

</button>

</div>

</div>

</div>

);

}

export default AddInternship;