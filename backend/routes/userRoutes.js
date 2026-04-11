const express = require('express');
const router = express.Router();
const multer = require("multer");

const User = require("../models/User");

const {
 register,
 login,
 getUserById,
 updateProfile
} = require("../controller/usercontroller");


// ================= PROFILE IMAGE STORAGE =================

const storageProfile = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, "uploads/profile/");
 },
 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }
});

const uploadProfile = multer({ storage: storageProfile });


// ================= RESUME STORAGE =================

const storageResume = multer.diskStorage({
 destination: "uploads/resume/",
 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }
});

const uploadResume = multer({ storage: storageResume });


// ================= AUTH ROUTES =================

router.post("/register", register);
router.post("/login", login);

router.put("/profile", updateProfile);
router.put("/update-user", updateProfile);


// ================= UPLOAD ROUTES (KEEP ABOVE :id) =================

// upload resume
router.post(
 "/upload-resume",
 uploadResume.single("resume"),
 async (req,res)=>{
  try{

   const user = await User.findOne({
    enrollmentNumber:req.body.enrollmentNumber
   });

   if(!user){
    return res.status(404).json({
     message:"Student not found"
    });
   }

   user.resume = req.file.filename;

   await user.save();

   res.json({
    message:"Resume uploaded"
   });

  }
  catch(err){
   res.status(500).json({
    message:"Upload error"
   });
  }
 }
);




// upload profile image
router.post(
 "/upload-profile",
 uploadProfile.single("image"),
 async (req,res)=>{

  try{

   const userId = req.body.userId;

   if(!req.file){
    return res.status(400).json({
     message:"No file uploaded"
    });
   }

   const imagePath = `uploads/profile/${req.file.filename}`;

   const user = await User.findByIdAndUpdate(
    userId,
    { profileImage:imagePath },
    { new:true }
   );

   res.json(user);

  }

  catch(err){

   console.log(err);

   res.status(500).json({
    message:"Upload failed"
   });

  }

 }
);


// ================= SEARCH =================

router.get("/search/:text", async (req,res)=>{

 const text = req.params.text;

 const users = await User.find({

  $or:[
   {
    name:{
     $regex:text,
     $options:"i"
    }
   },

   {
    email:{
     $regex:text,
     $options:"i"
    }
   },

   {
    enrollmentNumber:{
     $regex:text,
     $options:"i"
    }
   }
  ]

 });

 res.json(users);

});


// ================= GET ALL USERS =================

router.get("/", async (req,res)=>{
 const users = await User.find();
 res.json(users);
});


// ================= DYNAMIC ROUTES (ALWAYS LAST) =================

router.get("/:id", getUserById);

router.put("/:id", updateProfile);


module.exports = router;