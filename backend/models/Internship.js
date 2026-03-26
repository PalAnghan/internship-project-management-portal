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

 requiredSkills:{
  type:[String],
  required:true
 },

 companyName: {
  type: String,
  default: ""
},

companyAddress: {
  type: String,
  default: ""
},

 duration:{
  type:String,
  required:true
 },

 applicationDeadline:{
  type:Date,
  required:true
 },

 maxApplicants:{
  type:Number,
  // default:50
 },

skills: {
  type: [String],
  default: []
},

 status:{
  type:String,
  enum:["open","closed"],
  default:"open"
 },

 createdBy:{
  type:String,
  default:"admin"
 }

},{ timestamps:true });

module.exports =
mongoose.model("Internship", internshipSchema);