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

duration:String,

applicationDeadline:Date,

maxApplicants:Number,

companyName:String,

companyAddress:String,

internshipType:String,

pdf:String

},{ timestamps:true });

module.exports =
mongoose.model("Internship", internshipSchema);