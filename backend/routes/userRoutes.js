const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path"); 

const User = require("../models/User");

const {
 register,
 login,
 getUserById,
 updateProfile,
 uploadImage
} = require("../controller/usercontroller");





// profile image upload
const storageProfile = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, "uploads/profile/");
 },
 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }
});

const uploadProfile = multer({ storage: storageProfile });


// ================= AUTH ROUTES =================

router.post("/register", register);

router.post("/login", login);

router.get("/:id", getUserById);

router.put("/profile", updateProfile);

router.put("/update-user", updateProfile);


/* storage config */

const storage = multer.diskStorage({

 destination: "uploads/",

 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }

});

const upload = multer({ storage });

/* upload resume */

router.post(
"/upload-resume",
upload.single("resume"),
async (req,res)=>{

 try{

  const { enrollment } = req.body;

  if(!req.file){
   return res.status(400).json({
    message:"No file uploaded"
   });
  }

  const user = await User.findOne({
   enrollment: enrollment
  });

  if(!user){
   return res.status(404).json({
    message:"Student not found"
   });
  }

  user.resume = req.file.filename;

  await user.save();

  res.json({
   message:"Resume uploaded",
   file:req.file.filename
  });

 }
 catch(err){

  console.log("UPLOAD ERROR:", err);

  res.status(500).json({
   message:"Upload error"
  });

 }

});


// ================= PROFILE IMAGE =================

router.post(
 "/upload-profile",
 uploadProfile.single("image"),
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


// ================= GET USERS =================

router.get("/", async (req, res) => {

 const users = await User.find();

 res.json(users);

});


// ================= SEARCH =================

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
    enrollmentNumber: {
     $regex: text,
     $options: "i"
    }
   }

  ]

 });

 res.json(users);

});


module.exports = router;