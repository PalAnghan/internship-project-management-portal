const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    res.json({
      message: "Resume uploaded successfully",
      file: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ THIS LINE IS REQUIRED
module.exports = router;