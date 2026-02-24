const express = require("express");
const router = express.Router();

const Application = require("../models/Application");

require("../models/User");
require("../models/Internship");


// Apply internship
router.post("/apply", async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("studentId")
      .populate("internshipId");

    res.json(applications);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;