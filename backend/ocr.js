const Tesseract = require("tesseract.js");

const NOT_DETECTED = "Not detected";

async function readTextFromImage(imagePath){
 const result = await Tesseract.recognize(imagePath, "eng");
 return result.data.text;
}

function normalizeLines(text){
 return text
  .replace(/\r/g, "\n")
  .split("\n")
  .map((line)=>line.replace(/[|]/g, "I").replace(/\s+/g, " ").trim())
  .filter(Boolean);
}

function titleCase(value){
 return value
  .toLowerCase()
  .replace(/\b[a-z]/g, (letter)=>letter.toUpperCase());
}

function cleanName(value){
 const cleaned = value
  .replace(/[^A-Z\s'-]/gi, " ")
  .replace(/\b(SURNAME|GIVEN|NAME|NAMES|FIRST|MIDDLE|LAST|SEX|GENDER|NATIONALITY|DATE|BIRTH|DOB)\b/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

 return cleaned.length >= 3 ? titleCase(cleaned) : NOT_DETECTED;
}

function formatDate(value){
 const separated = value.match(/\b(\d{2,4})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\b/);

 if(separated){
  const first = separated[1].padStart(2, "0");
  const second = separated[2].padStart(2, "0");
  const third = separated[3].padStart(2, "0");

  if(first.length === 4){
   return `${first}-${second}-${third}`;
  }

  const year = third.length === 2 ? `${Number(third) > 30 ? "19" : "20"}${third}` : third;
  return `${year}-${second}-${first}`;
 }

 const digits = value.replace(/\D/g, "");

 if(digits.length === 8){
  const yearFirst = Number(digits.slice(0,4)) > 1900;
  const day = yearFirst ? digits.slice(6,8) : digits.slice(0,2);
  const month = yearFirst ? digits.slice(4,6) : digits.slice(2,4);
  const year = yearFirst ? digits.slice(0,4) : digits.slice(4,8);
  return `${year}-${month}-${day}`;
 }

 if(digits.length === 6){
  const yearPrefix = Number(digits.slice(0,2)) > 30 ? "19" : "20";
  return `${yearPrefix}${digits.slice(0,2)}-${digits.slice(2,4)}-${digits.slice(4,6)}`;
 }

 return NOT_DETECTED;
}

function findLineValue(lines, labels){
 for(const line of lines){
  const upper = line.toUpperCase();
  const label = labels.find((item)=>upper.includes(item));

  if(label){
   const parts = line.split(/[:\-]/);
   const value = parts.length > 1 ? parts.slice(1).join(" ") : line.replace(new RegExp(label, "i"), "");
   const cleaned = value.trim();

   if(cleaned){
    return cleaned;
   }
  }
 }

 return NOT_DETECTED;
}

function findPassportNumber(text){
 const match = text.match(/\b[A-Z][0-9]{7,9}\b/) || text.match(/\b[A-Z0-9]{8,9}\b(?=\dNGA|\dNGR|\d[A-Z]{3})/);
 return match ? match[0] : NOT_DETECTED;
}

function findNIN(text){
 const match = text.match(/\b[0-9]{11}\b/);
 return match ? match[0] : NOT_DETECTED;
}

function findNationality(text){
 if(/\b(NIGERIA|NIGERIAN|NGA|NGR)\b/i.test(text)){
  return "Nigeria";
 }

 return NOT_DETECTED;
}

function findGender(lines, text){
 const labelled = findLineValue(lines, ["SEX", "GENDER"]);
 const labelledMatch = labelled.match(/\b(MALE|FEMALE|M|F)\b/i);

 if(labelledMatch){
  return normalizeGender(labelledMatch[0]);
 }

 const mrzSex = text.match(/\b\d{6}\d?([MF<])\d{6}/);
 return mrzSex ? normalizeGender(mrzSex[1]) : NOT_DETECTED;
}

function normalizeGender(value){
 const upper = value.toUpperCase();

 if(upper === "M" || upper === "MALE"){
  return "Male";
 }

 if(upper === "F" || upper === "FEMALE"){
  return "Female";
 }

 return NOT_DETECTED;
}

function parseMrz(lines){
 const mrzLines = lines
  .map((line)=>line.toUpperCase().replace(/[^A-Z0-9<]/g, ""))
  .filter((line)=>line.includes("<<") || line.startsWith("P<"));

 const firstLine = mrzLines.find((line)=>line.startsWith("P<"));
 const secondLine = mrzLines.find((line)=>line !== firstLine && line.length >= 25);

 const result = {};

 if(firstLine){
  const namePart = firstLine.slice(5);
  const [surname, givenNames] = namePart.split("<<");
  const name = [givenNames, surname]
   .filter(Boolean)
   .join(" ")
   .replace(/</g, " ")
   .replace(/\s+/g, " ")
   .trim();

  if(name){
   result.fullName = titleCase(name);
  }
 }

 if(secondLine){
  const identity = secondLine.slice(0,9).replace(/</g, "");
  const nationality = secondLine.slice(10,13);
  const birthDate = secondLine.slice(13,19);
  const gender = secondLine.slice(20,21);
  const expiryDate = secondLine.slice(21,27);

  if(identity.length >= 8){
   result.identity = identity;
  }

  if(nationality === "NGA" || nationality === "NGR"){
   result.nationality = "Nigeria";
  }

  const formattedBirthDate = formatDate(birthDate);
  if(formattedBirthDate !== NOT_DETECTED){
   result.dateOfBirth = formattedBirthDate;
  }

  const normalizedGender = normalizeGender(gender);
  if(normalizedGender !== NOT_DETECTED){
   result.gender = normalizedGender;
  }

  const formattedExpiryDate = formatDate(expiryDate);
  if(formattedExpiryDate !== NOT_DETECTED){
   result.expiryDate = formattedExpiryDate;
  }
 }

 return result;
}

function findFullName(lines){
 const surname = cleanName(findLineValue(lines, ["SURNAME", "LAST NAME"]));
 const givenNames = cleanName(findLineValue(lines, ["GIVEN NAMES", "GIVEN NAME", "FIRST NAME", "OTHER NAMES"]));
 const fullName = cleanName(findLineValue(lines, ["FULL NAME", "NAME"]));

 if(fullName !== NOT_DETECTED){
  return fullName;
 }

 if(surname !== NOT_DETECTED && givenNames !== NOT_DETECTED){
  return `${givenNames} ${surname}`;
 }

 return surname !== NOT_DETECTED ? surname : givenNames;
}

function findDateOfBirth(lines, text){
 return findDateByLabels(lines, text, ["DATE OF BIRTH", "BIRTH DATE", "DOB"], true);
}

function findIssueDate(lines, text){
 return findDateByLabels(lines, text, ["ISSUE DATE", "DATE OF ISSUE", "ISSUED", "ISS"], false);
}

function findExpiryDate(lines, text){
 return findDateByLabels(lines, text, ["EXPIRY DATE", "EXPIRATION DATE", "DATE OF EXPIRY", "VALID UNTIL", "EXPIRES", "EXP"], false);
}

function findDateByLabels(lines, text, labels, allowAnyDateFallback){
 const labelled = findLineValue(lines, labels);
 const labelledDate = labelled.match(/\b(\d{2}[\/\-.]\d{2}[\/\-.]\d{4}|\d{4}[\/\-.]\d{2}[\/\-.]\d{2})\b/);

 if(labelledDate){
  return formatDate(labelledDate[0]);
 }

 if(!allowAnyDateFallback){
  return NOT_DETECTED;
 }

 const textDate = text.match(/\b(\d{2}[\/\-.]\d{2}[\/\-.]\d{4}|\d{4}[\/\-.]\d{2}[\/\-.]\d{2})\b/);
 return textDate ? formatDate(textDate[0]) : NOT_DETECTED;
}

function extractDetails(text){
 const lines = normalizeLines(text);
 const upper = text.toUpperCase();
 const mrz = parseMrz(lines);
 const passportNumber = findPassportNumber(upper);
 const nin = findNIN(upper);

 return {
  fullName: mrz.fullName || findFullName(lines) || NOT_DETECTED,
  identity: mrz.identity || (passportNumber !== NOT_DETECTED ? passportNumber : nin),
  nationality: mrz.nationality || findNationality(upper),
  dateOfBirth: mrz.dateOfBirth || findDateOfBirth(lines, upper),
  gender: mrz.gender || findGender(lines, upper),
  issueDate: findIssueDate(lines, upper),
  expiryDate: mrz.expiryDate || findExpiryDate(lines, upper),
  rawText: text
 };
}

module.exports = {
 readTextFromImage,
 extractDetails
};
