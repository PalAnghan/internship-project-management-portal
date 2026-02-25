const express = require("express");
const admin = express.Router();
const { admindetalis, register, login } = require("../controller/admincontroller");

admin.post("/register", register);
admin.post("/login", login);
admin.get("/", admindetalis);

module.exports = admin;