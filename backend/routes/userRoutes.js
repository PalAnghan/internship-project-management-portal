const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { register, login, getUserById, updateProfile } = require("../controller/usercontroller");
const User = require("../models/User");


/* ================= MULTER PROFILE IMAGE ================= */

const profileStorage = multer.diskStorage({

 destination: (req, file, cb) => {

  const dir = "uploads/profile/";

  if (!fs.existsSync(dir)) {
   fs.mkdirSync(dir, { recursive: true });
  }

  cb(null, dir);
 },

 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }

});

const uploadProfile = multer({ storage: profileStorage });


/* ================= MULTER RESUME ================= */

const resumeStorage = multer.diskStorage({

 destination: (req, file, cb) => {

  const dir = "uploads/resume/";

  if (!fs.existsSync(dir)) {
   fs.mkdirSync(dir, { recursive: true });
  }

  cb(null, dir);
 },

 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }

});

const uploadResume = multer({ storage: resumeStorage });


/* ================= AUTH ================= */

router.post("/register", register);

router.post("/login", login);


/* ================= UPDATE PROFILE ================= */

router.put("/update-user", async (req, res) => {

 try {

  const updatedUser = await User.findByIdAndUpdate(

   req.body._id,

   {
    name: req.body.name,
    bio: req.body.bio,
    github: req.body.github,
    linkedin: req.body.linkedin,
    skills: req.body.skills,
    department: req.body.department,
    enrollment: req.body.enrollment
   },

   { new: true }

  );

  res.json(updatedUser);

 }

 catch (error) {

  console.log(error);

  res.status(500).json({
   message: "Profile update failed"
  });

 }

});


/* ================= PROFILE IMAGE UPLOAD ================= */

router.post(

 "/upload-profile",

 uploadProfile.single("profileImage"),

 async (req, res) => {

  try {

   const userId = req.body.userId;

   if (!req.file) {

    return res.status(400).json({
     message: "No file uploaded"
    });

   }

   const imagePath = `uploads/profile/${req.file.filename}`;

   const user = await User.findByIdAndUpdate(

    userId,

    { profileImage: imagePath },

    { new: true }

   );

   res.json(user);

  }

  catch (err) {

   console.log(err);

   res.status(500).json({
    message: "Upload failed"
   });

  }

 }

);


/* ================= RESUME UPLOAD ================= */

router.post(

 "/upload-resume",

 uploadResume.single("resume"),

 async (req, res) => {

  try {

   const { enrollment } = req.body;

   if (!req.file) {

    return res.status(400).json({
     message: "No file uploaded"
    });

   }

const user = await User.findOne({
 enrollment: enrollment
});

if (!user) {
 return res.status(404).json({
  message: "Student not found"
 });
}

user.resume = req.file.filename;

await user.save();

res.json({
 message: "Resume uploaded successfully",
 resume: user.resume
});

  }

  catch (err) {

   console.log(err);

   res.status(500).json({

    message: "Upload error"

   });

  }

 }

);


/* ================= SEARCH ================= */

router.get("/search/:text", async (req, res) => {

 const text = req.params.text;

 const users = await User.find({

  $or: [

   {
    name: {
     $regex: text,
     $options: "i"
    }
   },

   {
    email: {
     $regex: text,
     $options: "i"
    }
   },

   {
    enrollment: {
     $regex: text,
     $options: "i"
    }
   }

  ]

 });

 res.json(users);

});


/* ================= GET ALL USERS ================= */

router.get("/", async (req, res) => {

 const users = await User.find();

 res.json(users);

});


/* ================= DYNAMIC ROUTES (ALWAYS LAST) ================= */

router.get("/:id", getUserById);

router.put("/:id", updateProfile);


module.exports = router;