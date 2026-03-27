const express = require("express");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const matchSkills = require("../utils/matchSkills");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req,res)=>{

try{

const studentId = req.query.studentId;

const student =
await User.findById(studentId);

const internships =
await Internship.find();

const result =
internships.map(internship => {

const matchScore =
matchSkills(

student?.skills || [],

internship.requiredSkills || []

);

return {

...internship._doc,

matchScore

};

});

res.json(result);

}
catch(err){

res.status(500).json({
error: err.message
});

}

});

// CREATE INTERNSHIP (Admin)

router.post("/", async (req, res) => {

  try {

    const {
      title,
      description,
      requiredSkills,
      duration,
      applicationDeadline,
      maxApplicants,
      companyName,
      companyAddress
    } = req.body;

    const internship = await Internship.create({
      title,
      description,
      requiredSkills,
      duration,
      applicationDeadline,
      maxApplicants,
      companyName,
      companyAddress
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


router.get("/company/:companyId", async (req, res) => {
  try {
    const internships = await Internship.find({
      companyId: req.params.companyId
    });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET ALL INTERNSHIPS



router.get("/", async (req,res)=>{

 try{

 const internships = await Internship.find();

 const updatedInternships =
 await Promise.all(

 internships.map(async (internship)=>{

 const count =
 await Application.countDocuments({

 internshipId: internship._id

 });

 return {

 ...internship._doc,

 appliedCount: count

 };

 })

 );

 res.json(updatedInternships);

 }

 catch(err){

 console.log(err);

 res.status(500).json([]);

 }

});

router.post("/apply", async (req, res) => {
  try {
    const { studentId, internshipId } = req.body;

    console.log("BODY:", req.body);

    if (!studentId || !internshipId) {
      return res.status(400).json({
        message: "Missing studentId or internshipId"
      });
    }

    const alreadyApplied = await Application.findOne({
      studentId,
      internshipId
    });


    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied"
      });
    }

    const total = await Application.countDocuments({
      internshipId
    });

    const internship = await Internship.findById(internshipId);

    if (
      internship.maxApplicants &&
      total >= internship.maxApplicants
    ) {
      return res.status(400).json({
        message: "Internship Full"
      });
    }

    await Application.create({
      studentId,
      internshipId
    });

    res.status(201).json({
      message: "Applied successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);

    // OPTIONAL: delete related applications
    await Application.deleteMany({
      internshipId: req.params.id
    });

    res.json({ message: "Internship deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req,res)=>{

const studentId = req.query.studentId;

const student =
await User.findById(studentId);

const internships =
await Internship.find();

const result = internships.map(internship => {

const matchScore =
matchSkills(

student.skills,

internship.requiredSkills

);

return {

...internship._doc,

matchScore

};

});

res.json(result);

});

module.exports = router;