require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const ConnectDB = require("./connect/db");
const { studentprotect } = require("./middleware/authstudent");
const { adminprotect } = require("./middleware/authadmin");
const admin = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
ConnectDB();

app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", studentprotect, userRoutes);
app.use("/api/admins", adminprotect, admin);


// Test API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend + MongoDB connected" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
