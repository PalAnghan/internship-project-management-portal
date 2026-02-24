const express = require("express");
const router = express.Router();

const User = require("../models/User");


// REGISTER USER / ADMIN
router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // create new user
    const newUser = new User({
      name,
      email,
      password,
      role: role || "student",
      skills: [],
      resume: ""
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully",
      role: newUser.role
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
});

module.exports = router;  