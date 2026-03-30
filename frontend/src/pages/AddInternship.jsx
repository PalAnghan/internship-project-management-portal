import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddInternship(){

const navigate = useNavigate();


/* ================= STATE ================= */

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


/* ================= DEPARTMENT SELECT ================= */

const handleDepartmentChange = (e)=>{

const value = e.target.value;

if(e.target.checked){

setDepartment(prev => [...prev,value]);

}

else{

setDepartment(

prev => prev.filter(dep => dep !== value)

);

}

};



/* ================= SUBMIT ================= */

const handleSubmit = async ()=>{

try{

const res = await fetch(

"http://localhost:5000/api/internships",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body: JSON.stringify({

title: internship.title,

description: internship.description,

requiredSkills:

internship.requiredSkills
.split(",")
.map(skill => skill.trim())
.filter(skill => skill !== ""),

duration: internship.duration,

applicationDeadline:
internship.applicationDeadline,

maxApplicants:
Number(internship.maxApplicants),

companyName:
internship.companyName,

companyAddress:
internship.companyAddress,

department: department

})

}

);

if(res.ok){

alert("Internship added successfully 🎉");

navigate("/admin");

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

background:

"linear-gradient(135deg,#141e30,#243b55)",

paddingBottom:"50px"

}}>



{/* NAVBAR */}

<nav

className="navbar navbar-dark bg-dark px-4"

>

<h5 className="text-white">

Admin Panel

</h5>


<button

className="btn btn-outline-light"

onClick={()=>navigate("/admin")}

>

🏠 Home

</button>

</nav>



<div className="container mt-5">


<div

className="card shadow-lg border-0"

style={{

maxWidth:"650px",

margin:"auto",

borderRadius:"18px",

background:"#ffffff"

}}

>


<div className="card-body">


<h3

className="text-center mb-4 fw-bold"

>

Add Internship

</h3>



{/* COMPANY */}

<input

className="form-control mb-3"

placeholder="Company Name"

onChange={(e)=>

setInternship({

...internship,

companyName:e.target.value

})

}

/>



<input

className="form-control mb-3"

placeholder="Company Address"

onChange={(e)=>

setInternship({

...internship,

companyAddress:e.target.value

})

}

/>



{/* TITLE */}

<input

className="form-control mb-3"

placeholder="Internship Title"

onChange={(e)=>

setInternship({

...internship,

title:e.target.value

})

}

/>



{/* DESCRIPTION */}

<textarea

className="form-control mb-3"

placeholder="Description"

rows="3"

onChange={(e)=>

setInternship({

...internship,

description:e.target.value

})

}

/>



{/* SKILLS */}

<input

className="form-control mb-3"

placeholder="Skills (comma separated)"

onChange={(e)=>

setInternship({

...internship,

requiredSkills:e.target.value

})

}

/>



{/* DURATION */}

<input

className="form-control mb-3"

placeholder="Duration (eg: 3 months)"

onChange={(e)=>

setInternship({

...internship,

duration:e.target.value

})

}

/>



{/* DEADLINE */}

<label className="fw-bold">

Application Deadline

</label>

<input

type="datetime-local"

className="form-control mb-3"

onChange={(e)=>

setInternship({

...internship,

applicationDeadline:e.target.value

})

}

/>



{/* MAX STUDENTS */}

<input

type="number"

className="form-control mb-3"

placeholder="Max students allowed"

onChange={(e)=>

setInternship({

...internship,

maxApplicants:e.target.value

})

}

/>



{/* DEPARTMENT */}

<h5 className="mt-3">

Select Department

</h5>


<div className="row">

{["BCA","B.Tech","Diploma","BBA","Pharmacy","Robotics"].map(dep=>(

<div

className="col-md-4 mb-2"

key={dep}

>

<label

className="form-check-label"

style={{

background:"#f1f5f9",

padding:"8px",

borderRadius:"8px",

width:"100%",

cursor:"pointer",

border:"1px solid #ddd"

}}

>

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



{/* SHOW SELECTED */}

<div className="mt-2">

<strong>

Selected:

</strong>

{" "}

{department.join(", ") || "None"}

</div>



{/* SUBMIT */}

<button

className="btn btn-primary w-100 mt-4"

style={{

padding:"12px",

fontSize:"16px",

borderRadius:"10px"

}}

onClick={handleSubmit}

>

Add Internship

</button>



</div>

</div>

</div>

</div>

);

}


export default AddInternship;