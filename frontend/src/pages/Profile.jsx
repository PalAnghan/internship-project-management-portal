import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

const navigate = useNavigate();

const user =
JSON.parse(localStorage.getItem("user"));

const [department,setDepartment] =
useState(user.department || "");

const [form,setForm] = useState({

 name:user?.name || "",

 skills:user?.skills
 ? user.skills.join(", ")
 : "",

 bio:user?.bio || "",

 github:user?.github || "",

 linkedin:user?.linkedin || "",

 enrollment:
user?.enrollment || ""

});


const handleUpdate = async () => {

const userData =
JSON.parse(localStorage.getItem("user"));

const skillsArray =
form.skills
.split(",")
.map(s => s.trim().toLowerCase());

const updatedUser = {

_id: userData._id,

name: form.name,

bio: form.bio,

github: form.github,

linkedin: form.linkedin,

skills: skillsArray,

department: department,

enrollment:form.enrollment

};

console.log("sending",updatedUser);


const res = await fetch(

"http://localhost:5000/api/users/profile",

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body: JSON.stringify(updatedUser)

}

);

const data = await res.json();

console.log("response",data);


localStorage.setItem(

"user",

JSON.stringify(data)

);

alert("Profile updated successfully");

};



return (

<div

style={{

minHeight:"100vh",

background:
"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

paddingBottom:"50px"

}}

>

{/* NAVBAR */}

<nav className="navbar navbar-dark bg-dark px-4">

<h5 className="text-white m-0">

Student Portal

</h5>

<button

className="btn btn-outline-light"

onClick={()=>
navigate("/student-dashboard")

}

>

Home

</button>

</nav>



{/* CARD */}

<div className="container pt-5">

<div

className="card border-0"

style={{

maxWidth:"520px",

margin:"auto",

borderRadius:"18px",

background:"rgba(255,255,255,0.95)",

backdropFilter:"blur(10px)",

boxShadow:
"0 20px 60px rgba(0,0,0,0.25)",

padding:"30px"

}}

>

{/* AVATAR */}

<div className="text-center mb-3">

<div

style={{

width:"85px",

height:"85px",

borderRadius:"50%",

margin:"auto",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"30px",

color:"white",

background:
"linear-gradient(90deg,#2979ff,#00b0ff)"

}}

>

👤

</div>

<h4 className="mt-2 fw-bold">

Student Profile

</h4>

<p className="text-muted">

Improve AI internship matching

</p>

</div>



{/* NAME */}

<label className="fw-semibold">

Name

</label>

<input

className="form-control mb-3"

value={form.name}

placeholder="Enter name"

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

style={{

borderRadius:"10px",

padding:"10px"

}}

/>

{/* ENROLLMENT NUMBER */}
<label>Enrollment Number</label>

<input
className="form-control mb-3"

value={form.enrollment || ""}

onChange={(e)=>
setForm({
...form,
enrollment:e.target.value
})
}
/>



{/* SKILLS */}

<label className="fw-semibold">

Skills

</label>

<input

className="form-control mb-3"

value={form.skills}

placeholder="react, node, css"

onChange={(e)=>

setForm({

...form,

skills:e.target.value

})

}

style={{

borderRadius:"10px",

padding:"10px"

}}

/>



{/* BIO */}

<label className="fw-semibold">

Bio

</label>

<textarea

className="form-control mb-3"

value={form.bio}

placeholder="short intro"

onChange={(e)=>

setForm({

...form,

bio:e.target.value

})

}

style={{

borderRadius:"10px",

height:"80px"

}}

/>



{/* DEPARTMENT */}

<label className="fw-semibold">

Department

</label>

<select

className="form-control mb-4"

value={department}

onChange={(e)=>

setDepartment(e.target.value)

}

style={{

borderRadius:"10px",

padding:"10px"

}}

>

<option value="">

Select Department

</option>

<option value="BCA">

BCA

</option>

<option value="B.Tech">

B.Tech

</option>

<option value="Diploma">

Diploma

</option>

<option value="BBA">

BBA

</option>

</select>



{/* LINKS */}

<label className="fw-semibold">

Github

</label>

<input

className="form-control mb-3"

value={form.github}

placeholder="github url"

onChange={(e)=>

setForm({

...form,

github:e.target.value

})

}

style={{

borderRadius:"10px"

}}

/>

<label className="fw-semibold">

LinkedIn

</label>

<input

className="form-control mb-4"

value={form.linkedin}

placeholder="linkedin url"

onChange={(e)=>

setForm({

...form,

linkedin:e.target.value

})

}

style={{

borderRadius:"10px"

}}

/>




{/* BUTTON */}

<button

className="btn w-100"

onClick={handleUpdate}

style={{

padding:"12px",

borderRadius:"12px",

fontWeight:"600",

color:"white",

border:"none",

background:
"linear-gradient(90deg,#2979ff,#00b0ff)",

boxShadow:
"0 8px 25px rgba(0,176,255,0.45)",

transition:"0.3s"

}}

>

Update Profile

</button>

</div>

</div>

</div>

);

}

export default Profile;