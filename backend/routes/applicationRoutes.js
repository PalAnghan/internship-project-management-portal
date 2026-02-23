const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

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
  const applications = await Application.find()
    .populate("studentId")
    .populate("internshipId");

  res.json(applications);
});

module.exports = router;