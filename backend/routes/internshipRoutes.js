const express = require("express");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const matchSkills = require("../utils/matchSkills");
const User = require("../models/User");

const router = express.Router();

const multer = require("multer");

/* ================= MULTER ================= */

const storage = multer.diskStorage({

 destination:"uploads/",

 filename:(req,file,cb)=>{
  cb(null,Date.now()+"-"+file.originalname);
 }

});

const upload = multer({ storage });

/* ================= GET INTERNSHIPS WITH MATCH SCORE ================= */

router.get("/", async (req,res)=>{

 try{

 const studentId = req.query.studentId;

 let student = null;

 if(studentId){
  student = await User.findById(studentId);
 }

 const internships = await Internship.find();

 const result = internships.map(internship => {

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

/* ================= CREATE INTERNSHIP (ADMIN) ================= */

router.post(
"/",

upload.fields([
 { name:"logo", maxCount:1 },
 { name:"pdf", maxCount:1 }
]),

async (req,res)=>{

 try{

 console.log("BODY:",req.body);
 console.log("FILES:",req.files);

 const internship = new Internship({

 title: req.body.title || "",

 description: req.body.description || "",

 requiredSkills:
 req.body.requiredSkills
 ? JSON.parse(req.body.requiredSkills)
 : [],

 duration: req.body.duration || "",

 applicationDeadline: req.body.applicationDeadline || "",

 maxApplicants: req.body.maxApplicants || "",

 companyName: req.body.companyName || "",

 companyAddress: req.body.companyAddress || "",

 department:
 req.body.department
 ? Array.isArray(req.body.department)
  ? req.body.department
  : [req.body.department]
 : [],

 /* ===== NEW REAL WORLD FIELDS ===== */

 companyWebsite: req.body.companyWebsite || "",

 companyDescription: req.body.companyDescription || "",

 industryType: req.body.industryType || "",

 stipend: req.body.stipend || "",

 internshipType: req.body.internshipType || "",

 experience: req.body.experience || "",

 perks: req.body.perks || "",

 selectionProcess: req.body.selectionProcess || "",

 /* ===== FILES ===== */

 logo:
 req.files?.logo?.[0]?.filename || "",

 pdf:
 req.files?.pdf?.[0]?.filename || ""

 });

 await internship.save();

 res.status(201).json({

 message:"Internship created successfully"

 });

 }

 catch(err){

 console.log("CREATE ERROR:",err);

 res.status(500).json({

 error: err.message

 });

 }

});

/* ================= GET INTERNSHIPS BY COMPANY ================= */

router.get("/company/:companyId", async (req,res)=>{

 try{

 const internships = await Internship.find({

 companyId: req.params.companyId

 });

 res.json(internships);

 }

 catch(err){

 res.status(500).json({

 error: err.message

 });

 }

});

/* ================= APPLY INTERNSHIP ================= */

router.post("/apply", async (req,res)=>{

 try{

 const { studentId, internshipId } = req.body;

 if(!studentId || !internshipId){

 return res.status(400).json({

 message:"Missing studentId or internshipId"

 });

 }

 const alreadyApplied =
 await Application.findOne({

 studentId,
 internshipId

 });

 if(alreadyApplied){

 return res.status(400).json({

 message:"Already applied"

 });

 }

 const total =
 await Application.countDocuments({

 internshipId

 });

 const internship =
 await Internship.findById(internshipId);

 if(

 internship.maxApplicants &&
 total >= internship.maxApplicants

 ){

 return res.status(400).json({

 message:"Internship Full"

 });

 }

 await Application.create({

 studentId,
 internshipId

 });

 res.status(201).json({

 message:"Applied successfully"

 });

 }

 catch(err){

 res.status(500).json({

 message:"Server error"

 });

 }

});

/* ================= DELETE ================= */

router.delete("/:id", async (req,res)=>{

 try{

 await Internship.findByIdAndDelete(req.params.id);

 await Application.deleteMany({

 internshipId: req.params.id

 });

 res.json({

 message:"Internship deleted"

 });

 }

 catch(err){

 res.status(500).json({

 error: err.message

 });

 }

});

/* ================= UPDATE ================= */

router.put("/:id", async (req,res)=>{

 try{

 const updated =
 await Internship.findByIdAndUpdate(

 req.params.id,
 req.body,
 { new:true }

 );

 res.json(updated);

 }

 catch(err){

 res.status(500).json({

 message:"update error"

 });

 }

});

/* ================= GET SINGLE ================= */

router.get("/:id", async (req,res)=>{

 try{

 const internship =
 await Internship.findById(req.params.id);

 if(!internship){

 return res.status(404).json({

 message:"Internship not found"

 });

 }

 res.json(internship);

 }

 catch(err){

 res.status(500).json({

 message:"Server error"

 });

 }

});

module.exports = router;