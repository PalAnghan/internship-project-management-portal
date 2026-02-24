const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ConnectDB = require("./connect/db");
const userRoutes = require("./routes/userRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", require("./routes/userRoutes"));


// Test API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend + MongoDB connected" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
