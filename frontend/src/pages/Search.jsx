import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

function Search(){

 const [text,setText] = useState("");

 const [results,setResults] = useState([]);

 const navigate = useNavigate();


 const handleSearch = ()=>{

 if(!text) return;

 fetch(

 `http://localhost:5000/api/users/search/${text}`

 )

 .then(res=>res.json())

 .then(data=>setResults(data))

 .catch(err=>console.log(err));

 };


 return(

 <div

 style={{

 minHeight:"100vh",

 background:

 "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

 padding:"40px"

 }}

 >

 {/* NAVBAR */}

 <nav

 className="navbar px-3 mb-4"

 style={{

 background:"rgba(0,0,0,0.6)",

 borderRadius:"10px"

 }}

 >

 <h5 className="text-white">

 🔍 Search Data

 </h5>

 <button

 className="btn btn-outline-light"

 onClick={()=>navigate("/admin")}

 >

 Dashboard

 </button>

 </nav>



 {/* CARD */}

 <div

 style={{

 maxWidth:"750px",

 margin:"auto",

 background:"white",

 padding:"30px",

 borderRadius:"18px",

 boxShadow:

 "0 20px 60px rgba(0,0,0,0.3)"

 }}

 >

 <h4 className="mb-3">

 Search students

 </h4>



 <input

 className="form-control mb-3"

 placeholder="name, email, enrollment"

 value={text}

 onChange={e=>setText(e.target.value)}

 />



 <button

 className="btn btn-primary w-100 mb-4"

 onClick={handleSearch}

 >

 Search

 </button>



 {results.length===0 && (

 <p className="text-muted">

 no result

 </p>

 )}



 {results.map(user=>(

 <div

 key={user._id}

 className="card p-3 mb-2"

 >

 <h6>

 {user.name}

 </h6>



 <p>

 {user.email}

 </p>



 <p>

 Dept:

 {user.department || "-"}

 </p>



 <p>

 Enrollment:

 {user.enrollmentNumber || "-"}

 </p>

 </div>

 ))}



 </div>

 </div>

 );

}

export default Search;