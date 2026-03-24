const express = require("express");
const admin = express.Router();
const { admindetalis, register, login, getAllStudents, downloadResume } = require("../controller/admincontroller");

admin.post("/register", register);
admin.post("/login", login);
admin.get("/", admindetalis);
admin.get("/students", getAllStudents);
admin.get("/students/resume/:id", downloadResume);



module.exports = admin;