const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// =======================
// APPLY INTERNSHIP
// =======================
router.post("/apply", async (req, res) => {

  try {

    const { studentId, internshipId } = req.body;

    const existing = await Application.findOne({
      studentId,
      internshipId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied"
      });
    }

    const application = await Application.create({
      studentId,
      internshipId,
      status: "Pending"
    });

    res.json(application);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// =======================
// GET ALL APPLICATIONS
// =======================
router.get("/", async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("studentId")
      .populate("internshipId");

    res.json(applications);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// =======================
// UPDATE STATUS
// =======================
router.put("/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(application);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;