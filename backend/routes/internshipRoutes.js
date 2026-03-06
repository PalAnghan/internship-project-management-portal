const express = require("express");
const Internship = require("../models/Internship");

const router = express.Router();


// ===============================
// CREATE INTERNSHIP (Admin)
// ===============================
router.post("/", async (req, res) => {

  try {

    const {
      title,
      description,
      requiredSkills,
      duration,
      applicationDeadline
    } = req.body;

    const internship = await Internship.create({
      title,
      description,
      requiredSkills,
      duration,
      applicationDeadline
    });

    res.status(201).json({
      message: "Internship created successfully",
      internship
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// ===============================
// GET ALL INTERNSHIPS
// ===============================
router.get("/", async (req, res) => {

  try {

    const internships = await Internship.find();

    const updatedInternships = internships.map((internship) => {

      // check deadline
      if (internship.applicationDeadline) {

        if (new Date() > new Date(internship.applicationDeadline)) {

          internship.status = "closed";

        } else {

          internship.status = "open";

        }

      }

      return internship;

    });

    res.json(updatedInternships);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


module.exports = router;