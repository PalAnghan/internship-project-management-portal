const express = require("express");
const router = express.Router();
const { register, login, studentdetalis } = require("../controller/usercontroller");
const upload = require("../middleware/resume");

router.post("/register", upload.single("resume"), register);
router.post("/login", login);
router.get("/", studentdetalis);

module.exports = router;