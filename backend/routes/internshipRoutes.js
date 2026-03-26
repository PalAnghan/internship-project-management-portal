const express = require("express");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

const router = express.Router();


// CREATE INTERNSHIP (Admin)

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


module.exports = router;