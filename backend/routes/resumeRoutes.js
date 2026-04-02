const express = require("express");
const router = express.Router();
const multer = require("multer");

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
 (req,res)=>{

  try{

   res.json({

    message:"Resume uploaded",

    file:req.file

   });

  }

  catch(err){

   res.status(500).json({

    message:"Upload error"

   });

  }

 }
);

module.exports = router;