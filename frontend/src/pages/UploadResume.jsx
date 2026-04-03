import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {

 const navigate = useNavigate();

 const [file,setFile] = useState(null);
 const [enrollment,setEnrollment] = useState("");
 const [uploading,setUploading] = useState(false);
 const [success,setSuccess] = useState(false);

 const handleUpload = async ()=>{

  if(!file || !enrollment){

   alert("Please enter enrollment and select resume");

   return;

  }

  const formData = new FormData();

  formData.append("resume",file);
formData.append("enrollment", enrollment);

  try{

   setUploading(true);

await axios.post(
"https://internship-backend-yn3q.onrender.com/api/resume/upload-resume",
formData
);
   setSuccess(true);

   setUploading(false);

  }

  catch(err){

   console.log(err);

   alert("Upload failed");

   setUploading(false);

  }

 };

 return (

 <div

 style={{

 minHeight:"100vh",

 background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",

 display:"flex",

 justifyContent:"center",

 alignItems:"center",

 padding:"20px"

 }}

 >

 {/* CARD */}

 <div

 style={{

 width:"420px",

 borderRadius:"18px",

 background:"rgba(255,255,255,0.95)",

 backdropFilter:"blur(12px)",

 padding:"35px",

 boxShadow:

 "0 20px 50px rgba(0,0,0,0.25)"

 }}

 >

 {/* BACK BUTTON */}

 <button

 onClick={()=>navigate("/student-dashboard")}

 style={{

 border:"none",

 background:"transparent",

 color:"#1976d2",

 fontWeight:"600",

 marginBottom:"10px",

 cursor:"pointer"

 }}

 >

  Back

 </button>


 {/* TITLE */}

 <h3

 style={{

 textAlign:"center",

 fontWeight:"700",

 marginBottom:"5px"

 }}

 >

  Upload Resume

 </h3>

 <p

 style={{

 textAlign:"center",

 color:"#666",

 marginBottom:"25px"

 }}

 >

 AI will match your skills automatically

 </p>



 {/* ENROLLMENT */}

 <label className="form-label">

 Enrollment Number

 </label>

 <input

 type="text"

 className="form-control mb-3"

 placeholder="Enter enrollment number"

 value={enrollment}

 onChange={(e)=>setEnrollment(e.target.value)}

 style={{

 padding:"10px",

 borderRadius:"10px"

 }}

 />



 {/* FILE UPLOAD */}

 <div

 style={{

 border:"2px dashed #90caf9",

 padding:"20px",

 borderRadius:"12px",

 textAlign:"center",

 marginBottom:"15px",

 background:"#f8fbff",

 transition:"0.3s"

 }}

 >

 <div

 style={{

 fontSize:"35px",

 marginBottom:"5px"

 }}

 >

 📎

 </div>

 <p

 style={{

 marginBottom:"10px",

 fontWeight:"500"

 }}

 >

 Choose Resume File

 </p>

 <input

 type="file"

 className="form-control"

 onChange={(e)=>setFile(e.target.files[0])}

 />


 {file && (

 <div

 style={{

 marginTop:"10px",

 color:"#2e7d32",

 fontWeight:"500"

 }}

 >

 Selected: {file.name}

 </div>

 )}

 </div>



 {/* BUTTON */}

 <button

 onClick={handleUpload}

 disabled={uploading}

 style={{

 width:"100%",

 padding:"12px",

 border:"none",

 borderRadius:"12px",

 fontWeight:"600",

 color:"white",

 background:

 uploading

 ? "#90caf9"

 : "linear-gradient(90deg,#2979ff,#00b0ff)",

 boxShadow:

 "0 6px 20px rgba(0,176,255,0.4)",

 transition:"0.3s"

 }}

 >

 {uploading

 ? "Uploading..."

 : "Upload Resume"}

 </button>



 {/* SUCCESS */}

 {success && (

 <div

 style={{

 marginTop:"15px",

 background:"#e8f5e9",

 color:"#2e7d32",

 padding:"10px",

 borderRadius:"8px",

 textAlign:"center",

 fontWeight:"500"

 }}

 >

 ✔ Resume uploaded successfully

 </div>

 )}

 </div>

 </div>

 );

};

export default UploadResume;