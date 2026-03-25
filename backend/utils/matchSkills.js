const commonSkills = [

"html",
"css",
"javascript",

"react",
"angular",
"vue",
"next",

"node",
"express",

"mongodb",
"mysql",
"sql",

"python",
"java",
"c",
"cpp",

"bootstrap",
"tailwind",

"php",
"laravel",

"api",
"rest",
"json",

"git",
"github",

"frontend",
"backend",

"responsive",
"ui",
"ux"

];


function normalizeText(text){

 return text
 .toLowerCase()

 // html css versions
 .replace(/html5/g,"html")
 .replace(/css3/g,"css")

 // javascript variations
 .replace(/javascript/g,"javascript")
 .replace(/\bjs\b/g,"javascript")
 .replace(/es6/g,"javascript")

 // react variations
 .replace(/react.js/g,"react")
 .replace(/reactjs/g,"react")

 // node variations
 .replace(/node.js/g,"node")
 .replace(/nodejs/g,"node")

 // express variations
 .replace(/express.js/g,"express")
 .replace(/expressjs/g,"express")

 // database variations
 .replace(/mongo db/g,"mongodb")
 .replace(/mongo/g,"mongodb")

 // remove symbols
 .replace(/[^a-z\s]/g," ");

}



function extractSkillsFromText(text){

 const words = normalizeText(text);

 let foundSkills = [];

 commonSkills.forEach(skill => {

 if(words.includes(skill)){

 foundSkills.push(skill);

 }

 });

 return foundSkills;

}


function calculateMatch(internshipSkills, resumeText){

 const studentSkills =
 extractSkillsFromText(resumeText);

 let match = 0;

 internshipSkills.forEach(skill => {

 if(
 studentSkills.includes(
 skill.toLowerCase()
 )
 ){
 match++;
 }

 });

 return Math.round(

 (match / internshipSkills.length) * 100

 );

}

module.exports = calculateMatch;