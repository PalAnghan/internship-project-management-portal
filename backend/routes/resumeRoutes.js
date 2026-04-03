const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");

const storage = multer.diskStorage({
 destination:"uploads/",
 filename:(req,file,cb)=>{
  cb(null, Date.now()+"-"+file.originalname);
 }
});

const upload = multer({storage});

router.post(
 "/upload",
 upload.single("resume"),
 async (req,res)=>{

  try{

   const { enrollment } = req.body;

   const user = await User.findOne({
    enrollmentNumber: enrollment
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

   console.log(err);

   res.status(500).json({

    message:"Upload error"

   });

  }

 }
);

module.exports = router;