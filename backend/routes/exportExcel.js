const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");

const Application = require("../models/Application");
const Internship = require("../models/Internship");

/* ================= EXPORT ALL ================= */

router.get("/", async (req,res)=>{

 try{

  const applications =
  await Application.find()
  .populate("studentId")
  .populate("internshipId");

  const workbook = new ExcelJS.Workbook();

  const worksheet =
  workbook.addWorksheet("Students");

  worksheet.columns = [

   {
    header:"StudentName",
    key:"name",
    width:25
   },

   {
    header:"Email",
    key:"email",
    width:30
   },

   {
    header:"Department",
    key:"department",
    width:25
   },

  ];

  applications.forEach(app=>{

   worksheet.addRow({

    name:
    app.studentId?.name || "",

    email:
    app.studentId?.email || "",

    department:
    app.internshipId?.department?.join(", ") || "",


   });

  });

  res.setHeader(
   "Content-Type",
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
   "Content-Disposition",
   "attachment; filename=students.xlsx"
  );

  await workbook.xlsx.write(res);

  res.end();

 }
 catch(err){

  console.log(err);

  res.status(500).json({
   message:"Export error"
  });

 }

});


/* ================= EXPORT BY COMPANY ================= */

router.get("/company/:id", async (req,res)=>{

 try{

  const applications =
  await Application.find({
   internshipId:req.params.id
  })
  .populate("studentId")
  .populate("internshipId");

  const workbook =
  new ExcelJS.Workbook();

  const worksheet =
  workbook.addWorksheet("Company Students");

  worksheet.columns = [

   {
    header:"StudentName",
    key:"name",
    width:25
   },

   {
    header:"Email",
    key:"email",
    width:30
   },

   {
    header:"Department",
    key:"department",
    width:25
   },

  ];

  applications.forEach(app=>{

   worksheet.addRow({

    name:
    app.studentId?.name || "",

    email:
    app.studentId?.email || "",

    department:
    app.internshipId?.department?.join(", ") || "",

   });

  });

  res.setHeader(
   "Content-Type",
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
   "Content-Disposition",
   "attachment; filename=company_students.xlsx"
  );

  await workbook.xlsx.write(res);

  res.end();

 }
 catch(err){

  console.log(err);

  res.status(500).json({
   message:"Company export error"
  });

 }

});

module.exports = router;