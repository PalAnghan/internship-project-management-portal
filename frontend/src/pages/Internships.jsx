import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

function Internships(){

const navigate = useNavigate();

const [internships,setInternships] = useState([]);
const [appliedIds,setAppliedIds] = useState([]);
const [saved,setSaved] = useState([]);

const [search,setSearch] = useState("");
const [skillFilter,setSkillFilter] = useState("");
const [category,setCategory] = useState("");

const user =
JSON.parse(localStorage.getItem("user"));

const studentSkills =
(user?.skills||[])
.map(s=>s.toLowerCase().trim());


const getMatchPercent = (studentSkills, requiredSkills) => {

 if(!studentSkills || !requiredSkills) return 0;

 const normalize = (arr) =>
  arr.map(s =>
   s
   .toLowerCase()
   .replace(/\s+/g,"")
   .trim()
  );

 const student = normalize(studentSkills);
 const required = normalize(requiredSkills);

 const match = required.filter(skill =>
  student.includes(skill)
 );

 return Math.round(
  (match.length / required.length) * 100
 );

};

/* ================= FETCH ================= */

useEffect(()=>{

fetchInternships();
fetchApplied();

const savedData =
JSON.parse(localStorage.getItem("savedInternships"))||[];

setSaved(savedData);

},[]);

const fetchInternships = async () => {

 try{

 const res = await fetch(
 "https://internship-backend-yn3q.onrender.com/api/internships"
 );

 const data = await res.json();

//  const withScore =
//  data.map(item=>{

//  const required =
//  (item.requiredSkills||[])
//  .map(s=>s.toLowerCase());

//  const matchCount =
//  required.filter(skill=>
//  studentSkills.includes(skill)
//  ).length;

//  const matchScore =
//  required.length>0
//  ? Math.round((matchCount/required.length)*100)
//  : 0;

//  return{
//  ...item,
//  matchScore
//  };

//  });





 setInternships(data);

 }
 catch(err){

 console.log(err);

 }

};

const fetchApplied = async ()=>{

try{

const res = await fetch(
`https://internship-backend-yn3q.onrender.com/api/applications/student/${user._id}`
);

const data = await res.json();

setAppliedIds(
data.map(app=> app.internshipId?._id )
);

}
catch(err){

console.log(err);

}

};

/* ================= APPLY ================= */

const handleApply = async(id)=>{

try{

const res = await fetch(

"https://internship-backend-yn3q.onrender.com/api/applications/apply",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

studentId:user._id,
internshipId:id

})

}   

);

if(res.ok){

alert("Applied successfully!");

setAppliedIds(prev=>[...prev,id]);

}

}

catch(err){

console.log(err);

}

};

/* ================= SAVE ================= */

const toggleSave = id =>{

let updated;

if(saved.includes(id)){

updated =
saved.filter(x=>x!==id);

}

else{

updated =
[...saved,id];

}

setSaved(updated);

localStorage.setItem(
"savedInternships",
JSON.stringify(updated)
);

};

/* ================= CATEGORY ================= */

const getCategory = skills =>{

const s =
(skills||[])
.join(" ")
.toLowerCase();

if(s.includes("react")||s.includes("html")||s.includes("css"))
return "Web Development";

if(s.includes("python")||s.includes("ai")||s.includes("ml"))
return "AI / ML";

if(s.includes("data"))
return "Data Science";

if(s.includes("android"))
return "App Development";

return "Other";

};

/* ================= FILTER ================= */

const filtered =
internships

.filter(item=>

 item.title?.toLowerCase()
 .includes(search.toLowerCase())

 ||

 item.companyName?.toLowerCase()
 .includes(search.toLowerCase())

)

.filter(item=>

 skillFilter===""

 ||

 (item.requiredSkills||[])
 .join(" ")
 .toLowerCase()
 .includes(skillFilter.toLowerCase())

)

.filter(item=>

 category===""

 ||

 getCategory(item.requiredSkills)===category

);

const sorted = filtered;

const recommended = sorted;
const trending = sorted;

/* ================= TIME ================= */

const getRemainingTime = deadline =>{

const now = new Date();
const end = new Date(deadline);
const diff = end-now;

if(diff<=0) return "Closed";

const d =
Math.floor(diff/(1000*60*60*24));

const h =
Math.floor((diff%(1000*60*60*24))/(1000*60*60));

return `${d}d ${h}h`;

};

/* ================= CARD ================= */

const Card = ({ item }) => {

const applied =
appliedIds.includes(item._id);

const savedItem =
saved.includes(item._id);

return (

<div className="col-lg-4 col-md-6 mb-4">

<div

className="card h-100 border-0 shadow-lg"

style={{
borderRadius:"18px",
padding:"18px",
background:"linear-gradient(145deg,#ffffff,#f8fbff)",
transition:"0.3s"
}}

>

{/* MATCH BAR */}

<div

style={{
height:"6px",
borderRadius:"10px",
background:"linear-gradient(90deg,#00c853,#64dd17)",

marginBottom:"12px"
}}

/>

{/* TITLE */}

<h5 className="fw-bold mb-1">
{item.title}
</h5>

<p>
Skill Match:
<b>
{getMatchPercent(
 JSON.parse(localStorage.getItem("user"))?.skills || [],
 Array.isArray(item.requiredSkills)
 ? item.requiredSkills
 : item.requiredSkills.split(",")
)
}%
</b>
</p>

<p className="text-muted mb-2">
{item.companyName}
</p>

{/* DETAILS */}

<div className="small mb-2">

<div className="mb-1">
 {item.stipend || "Not specified"}
</div>

<div className="mb-1">
 {item.internshipType || "Remote"}
</div>

<div className="mb-1">
 {item.experience || "Fresher"}
</div>

<div className="mb-1">
 {item.perks || "Certificate"}
</div>

<div className="mb-1">
{item.selectionProcess || "Interview"}
</div>

</div>

{/* LINKS */}

<div className="mb-2">

{item.companyWebsite && (

<a
href={item.companyWebsite}
target="_blank"
rel="noreferrer"
className="me-3 small text-primary fw-semibold"
>

Website

</a>

)}

{item.pdf && (

<a
 href={`https://internship-backend-yn3q.onrender.com/uploads/${item.pdf}`}
 target="_blank"
>
 View PDF
</a>

)} 

</div>

{/* SKILLS */}

<div className="mb-2">

{(item.requiredSkills||[]).map((skill,i)=>(

<span
key={i}
className="badge me-1 mb-1"
style={{
background:"#e3f2fd",
color:"#0d47a1",
padding:"6px 10px",
borderRadius:"8px",
width: `${getMatchPercent(
 studentSkills,
 Array.isArray(item.requiredSkills)
 ? item.requiredSkills
 : item.requiredSkills.split(",")
)}%`
}}
>

{skill}

</span>
    
))}

</div>

<p className="text-muted small mb-3">
 {getRemainingTime(item.applicationDeadline)}
</p>

{/* BUTTONS */}

<a
href={`https://internship-backend-yn3q.onrender.com/uploads/${item.pdf}`}
target="_blank"
>

View Company Details

</a>

<button

className="btn w-100 mb-2"

style={{
background:
applied
? "#9ec5fe"
: "linear-gradient(90deg,#2979ff,#00b0ff)",
color:"white",
borderRadius:"10px",
fontWeight:"600"
}}

disabled={applied}

// onClick={()=>handleApply(item._id)}

onClick={()=>{

const user =
 JSON.parse(localStorage.getItem("user"));

if(!user.skills || user.skills.length===0){

 alert("Please add skills in profile");

 navigate("/profile");

 return;
}

if(!user.resume || user.resume === ""){

 alert("Resume required before applying");

 navigate("/upload-resume");

 return;
}

handleApply(item._id);

}}

>

{applied ? "Applied ✔" : "Apply Now"}

</button>

<button

className="btn w-100"

style={{
borderRadius:"10px",
border:
savedItem
? "2px solid #e91e63"
: "2px solid #ccc",
color:
savedItem
? "#e91e63"
: "#444",
background:"#fff"
}}

onClick={()=>toggleSave(item._id)}

>

{savedItem ? "Saved ❤" : "Save ♡"}

</button>

</div>

</div>

);

};

/* ================= UI ================= */

return (

<div

style={{

minHeight:"100vh",

background:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

paddingBottom:"60px"

}}

>

{/* NAVBAR */}
<nav
style={{

display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"14px 28px",
background:"rgba(0,0,0,0.35)",
backdropFilter:"blur(10px)",
borderBottom:"1px solid rgba(255,255,255,0.08)"

}}
>

{/* LEFT */}
<h4
style={{
color:"white",
fontWeight:"700",
letterSpacing:"0.4px"
}}
>
Internships Portal
</h4>


{/* RIGHT */}
<div style={{display:"flex",gap:"10px"}}>

<button
className="btn btn-outline-light"
style={{
borderRadius:"10px",
padding:"6px 18px"
}}
onClick={()=>navigate("/student-dashboard")}
>
Home
</button>

<button
className="btn btn-outline-light"
style={{
borderRadius:"10px",
padding:"6px 18px"
}}
onClick={()=>navigate("/saved")}
>
Saved
</button>

</div>

</nav>

<div className="container py-4">

{/* SEARCH */}

<div

className="card shadow-lg border-0 mb-4"

style={{
borderRadius:"16px",
padding:"15px"
}}

>

<div className="row g-2">

<div className="col-md-4">

<input

type="text"

placeholder="Search internship"

className="form-control"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<div className="col-md-4">

<input

type="text"

placeholder="Filter skill"

className="form-control"

value={skillFilter}

onChange={(e)=>setSkillFilter(e.target.value)}

/>

</div>

<div className="col-md-4">

<select

className="form-control"

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option value="">
All Categories
</option>

<option>
Web Development
</option>

<option>
AI / ML
</option>

<option>
App Development
</option>

<option>
Data Science
</option>

</select>

</div>

</div>

</div>

{/* SECTIONS */}


<h4 className="text-white mb-3">
Recommended
</h4>

<div className="row">

{recommended.slice(0,1).map(item=>(

<Card key={item._id} item={item} />

))}

</div>



<h4 className="text-white mt-4 mb-3">
All Internships
</h4>

<div className="row">

{filtered.map(item=>(

<Card key={item._id} item={item} />

))}

</div>

</div>

</div>

);

}

export default Internships;