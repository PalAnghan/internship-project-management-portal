const express = require("express");
const router = express.Router();

const User = require("../models/User");

const multer = require("multer");
const path = require("path");

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// define upload
const upload = multer({ storage: storage });  

// ✅ REGISTER (student or admin)
router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // create user
    const newUser = new User({  
      name,
      email,
      password,
      role: role || "student",
      skills: [],
      resume: "",
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully",
      role: newUser.role,
      user: newUser
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });

  }
});


// ✅ LOGIN (student or admin)
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      role: user.role,
      user: user
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });

  }
});

// GET all users
router.get("/", async (req, res) => {
  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {

    const { userId } = req.body;   // get userId from frontend

    if (!userId) {
      return res.status(400).json({
        message: "User ID required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // save filename
    user.resume = req.file.filename;

    await user.save();

    res.json({
      message: "Resume uploaded successfully",
      file: req.file.filename
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = router;