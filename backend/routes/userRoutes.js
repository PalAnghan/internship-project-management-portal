const express = require("express");
const router = express.Router();


const upload = require("../middleware/resume");

const { register, login, getUserById, updateProfile, uploadImage } =
require("../controller/usercontroller");


const User = require("../models/User");




router.post("/register", upload.single("resume"), register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/profile", updateProfile);

router.post("/upload-image", upload.single("image"), uploadImage);

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {

    const { userId, enrollment } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.resume = req.file.filename;
    user.enrollment = enrollment;   

    await user.save();

    res.json({
      message: "Resume uploaded successfully",
      filename: req.file.filename
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
});


exports.updateProfile = async (req,res)=>{

 try{

  console.log("incoming data:", req.body);

  const updatedUser =
  await User.findByIdAndUpdate(

   req.body._id,

   {
    name:req.body.name,
    bio:req.body.bio,
    github:req.body.github,
    linkedin:req.body.linkedin,
    skills:req.body.skills,

    department:req.body.department,  // IMPORTANT
    enrollment:req.body.enrollment   // keep existing field
   },

   { new:true }

  );

  console.log("updated user:", updatedUser);

  res.json(updatedUser);

 }
 catch(error){

  console.log(error);

  res.status(500).json({

   message:"profile update failed"

  });

 }

};

router.get("/", async (req,res)=>{

const users = await User.find();

res.json(users);

});

router.get("/search/:text", async(req,res)=>{

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
    enrollment:{
     $regex:text,
     $options:"i"
    }
   }

  ]

 });

 res.json(users);

});




const multer = require("multer");

const storage = multer.diskStorage({

 destination:(req,file,cb)=>{
  cb(null,"uploads/profile");
 },

 filename:(req,file,cb)=>{
  cb(null, Date.now()+"-"+file.originalname);
 }

});

const uploadProfile = multer({ storage });

router.post(
"/upload-profile",
uploadProfile.single("profileImage"),
async (req,res)=>{

 try{

  console.log(req.body);   // debug
  console.log(req.file);   // debug

  const userId = req.body.userId;

  if(!req.file){
   return res.status(400).json({
    message:"No file uploaded"
   });
  }

  if(!userId){
   return res.status(400).json({
    message:"User ID missing"
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

  console.log("UPLOAD ERROR:", err);

  res.status(500).json({
   message:"Upload failed",
   error:err.message
  });

 }

});
module.exports = router;