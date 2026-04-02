import React,{useEffect,useState} from "react";

function SavedInternships(){

const [saved,setSaved] = useState([]);
const [internships,setInternships] = useState([]);

useEffect(()=>{

const savedIds =
JSON.parse(localStorage.getItem("savedInternships")) || [];

setSaved(savedIds);

fetchInternships(savedIds);

},[]);

const fetchInternships = async(ids)=>{

const res = await fetch(
"https://internship-backend-yn3q.onrender.com/api/internships"
);

const data = await res.json();

const filtered =
data.filter(item =>
 ids.includes(item._id)
);

setInternships(filtered);

};

return(

<div className="container mt-4">

<h3 className="mb-4">
 Saved Internships 
</h3>

<div className="row">

{internships.map(item=>(

<div className="col-md-4 mb-3">

<div className="card p-3 shadow">

<h5>{item.title}</h5>

<p>{item.companyName}</p>

<p>
{item.requiredSkills?.join(", ")}
</p>

<a
href={`https://internship-backend-yn3q.onrender.com/uploads/${item.pdf}`}
target="_blank"
>
View Company PDF
</a>

</div>

</div>

))}

</div>

</div>

);

}

export default SavedInternships;