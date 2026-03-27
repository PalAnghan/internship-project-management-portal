import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

const navigate = useNavigate();

const user =
JSON.parse(localStorage.getItem("user"));

const [form, setForm] = useState({

name: user?.name || "",

skills: user?.skills
? user.skills.join(", ")
: "",

bio: user?.bio || "",

github: user?.github || "",

linkedin: user?.linkedin || ""

});


const handleUpdate = async () => {

const updatedData = {

...form,

_id: user._id,

skills: form.skills
.split(",")
.map(s => s.trim().toLowerCase())

};    

await fetch(

`http://localhost:5000/api/users/profile`,

{

method: "PUT",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify(updatedData)

}

);

alert("Profile updated successfully");

};


return (

<div

style={{

minHeight: "100vh",

background:

"linear-gradient(to right,#141e30,#243b55)",

paddingBottom: "40px"

}}

>


<nav className="navbar navbar-dark bg-dark px-4">

<h5 className="text-white">

Student Portal

</h5>


<button

className="btn btn-outline-light"

onClick={() => navigate("/student-dashboard")}

>

Home

</button>

</nav>


<div className="container pt-5">


<div

className="card shadow p-4"

style={{

maxWidth: "500px",

margin: "auto",

borderRadius: "12px"

}}

>


<h2 className="text-center mb-3">

Profile

</h2>


<input

className="form-control mb-2"

placeholder="Name"

value={form.name}

onChange={e =>

setForm({

...form,

name: e.target.value

})

}

/>


<input

className="form-control mb-2"

placeholder="Skills (comma separated)"

value={form.skills}

onChange={e =>

setForm({

...form,

skills: e.target.value

})

}

/>


<textarea

className="form-control mb-2"

placeholder="Bio"

value={form.bio}

onChange={e =>

setForm({

...form,

bio: e.target.value

})

}

/>


<input

className="form-control mb-2"

placeholder="Github link"

value={form.github}

onChange={e =>

setForm({

...form,

github: e.target.value

})

}

/>


<input

className="form-control mb-3"

placeholder="LinkedIn link"

value={form.linkedin}

onChange={e =>

setForm({

...form,

linkedin: e.target.value

})

}

/>


<button

className="btn btn-primary w-100"

onClick={handleUpdate}

>

Update Profile

</button>


</div>

</div>

</div>

);

}

export default Profile;