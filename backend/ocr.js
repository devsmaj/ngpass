const Tesseract = require("tesseract.js");

async function readTextFromImage(imagePath){
 const result = await Tesseract.recognize(imagePath, "eng");
 return result.data.text;
}

function findPassportNumber(text){
 const match = text.match(/[A-Z][0-9]{7,9}/);
 return match ? match[0] : "Not detected";
}

function findNIN(text){
 const match = text.match(/\b[0-9]{11}\b/);
 return match ? match[0] : "Not detected";
}

function findNationality(text){
 if(text.toLowerCase().includes("nigeria")){
  return "Nigeria";
 }

 return "Not detected";
}

function extractDetails(text){
 const upper = text.toUpperCase();

 const passportNumber = findPassportNumber(upper);
 const nin = findNIN(upper);

 return {
  fullName: "Not detected",
  identity: passportNumber !== "Not detected" ? passportNumber : nin,
  nationality: findNationality(upper),
  dateOfBirth: "Not detected",
  gender: "Not detected",
  rawText: text
 };
}

module.exports = {
 readTextFromImage,
 extractDetails
};
