const express = require("express");
const Internship = require("../models/Internship");

const router = express.Router();

// Create internship
router.post("/", async (req, res) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json(internship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all internships
router.get("/", async (req, res) => {
  const internships = await Internship.find();
  res.json(internships);
});

module.exports = router;