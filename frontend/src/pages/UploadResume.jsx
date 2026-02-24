import React, { useState } from "react";

function UploadResume() {

  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState("");
  const handleUpload = async () => {

  const formData = new FormData();

  formData.append("resume", file);

  // ✅ GET LOGGED-IN USER AUTOMATICALLY
  const user = JSON.parse(localStorage.getItem("user"));

  formData.append("userId", user._id);

  const res = await fetch("http://localhost:5000/api/users/upload-resume", {
    method: "POST",
    body: formData,
  });

  alert("Resume uploaded successfully");
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Resume</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>

      <br /><br />

      {uploadedFile && (
        <img
          src={`http://localhost:5000/uploads/${uploadedFile}`}
          width="200"
          alt="resume preview"
        />
      )}

    </div>
  );
}

export default UploadResume;