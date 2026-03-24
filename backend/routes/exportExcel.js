const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");

const Application = require("../models/Application");

router.get("/:internshipId", async (req, res) => {

  try {

    const applications = await Application.find({
      internshipId: req.params.internshipId
    })
    .populate("studentId")
    .populate("internshipId");



    const data = applications.map(app => ({

  StudentName: app.studentId?.name || app.studentId?.email || "No Name",

  Email: app.studentId?.email || "No Email",

  Internship: app.internshipId?.title || "No Internship",

  Status: app.status || "Applied"

}));



    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");



    const fileName =
      applications[0]?.internshipId?.title.replace(/\s/g, "_")
      || "students";



    const filePath = `${fileName}.xlsx`;



    XLSX.writeFile(workbook, filePath);



    res.download(filePath);



  } catch (err) {

    console.log(err);

    res.status(500).send("Error generating excel");

  }

});



module.exports = router;