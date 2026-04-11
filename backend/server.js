// require("dotenv").config();

// const path = require("path");
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// const ConnectDB = require("./connect/db");

// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const internshipRoutes = require("./routes/internshipRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// // const resumeRoutes = require("./routes/resumeRoutes");

// const exportExcel = require("./routes/exportExcel");

// const app = express();

// // Middleware
// app.use(cors());  
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static("uploads"));



// app.get("/", (req, res) => {
//   res.send("Backend working ");
// });

// // Connect DB
// ConnectDB();

// // Static uploads folder (FOR RESUME DOWNLOAD)
//  app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/admins", adminRoutes);
// app.use("/api/internships", internshipRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/export", exportExcel);  





// // Test API
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend + MongoDB connected" });
// });

// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ConnectDB = require("./connect/db");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const exportExcel = require("./routes/exportExcel");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

 app.use("/api/resume", resumeRoutes);

// static uploads folder
app.use("/uploads", express.static("uploads"));

// connect database
ConnectDB();


const fs = require("fs");

if (!fs.existsSync("uploads")){
 fs.mkdirSync("uploads");
}

if (!fs.existsSync("uploads/resume")){
 fs.mkdirSync("uploads/resume");
}

if (!fs.existsSync("uploads/profile")){
 fs.mkdirSync("uploads/profile");
}

// routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/export", exportExcel);
app.use("/api/resume", require("./routes/resumeRoute"));

// test route
app.get("/", (req, res) => {
 res.send("Backend working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});