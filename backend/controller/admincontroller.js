const Admin = require("../models/admin");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin Registered Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Admin.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // ensure role exists for older records without the field
    const role = company.role || "admin";

    const token = jwt.sign(
      { id: company._id, role },
      process.env.JWT_SECRET1,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    // include role at top-level for easier checks on the frontend
    res.status(200).json({
      message: "Login Successful",
      company,
      role
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET all users
exports.admindetalis= async (req, res) => {
  try {
    const admins = await Admin.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
  try {

    const students = await User.find({ role: "student" })
      .select("-password");

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      students
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.downloadResume = async (req, res) => {

  try {

    const student = await User.findById(req.params.id);

    if (!student || !student.resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.download(student.resume);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};