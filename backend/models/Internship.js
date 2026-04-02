const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

 title:{
  type:String,
  required:true
 },

 description:{
  type:String,
  required:true
 },

requiredSkills:[String],

department:{
 type:[String],
 default:[]
},

companyWebsite:String,
companyDescription:String,
industryType:String,

stipend:String,
internshipType:String,
experience:String,

perks:String,
selectionProcess:String,

logo:String,
pdf:String
},{ timestamps:true });

module.exports =
mongoose.model("Internship", internshipSchema);