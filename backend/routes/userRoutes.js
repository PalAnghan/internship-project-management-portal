const express = require("express");
const router = express.Router();

const { register, login, getUserById } = require("../controller/usercontroller");
const upload = require("../middleware/resume");


const User = require("../models/User");

router.post("/register", upload.single("resume"), register);
router.post("/login", login);
router.get("/:id", getUserById);

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

router.put("/profile", async (req,res)=>{

try{

const { name, skills, bio, github, linkedin } = req.body;

const userId = req.body._id || req.body.id;

const updatedUser =
await User.findByIdAndUpdate(

userId,

{
name,
skills,
bio,
github,
linkedin
},

{ new:true }

);

res.json(updatedUser);

}
catch(err){

res.status(500).json({
error: err.message
});

}

});


module.exports = router;