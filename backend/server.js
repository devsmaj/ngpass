const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { readTextFromImage, extractDetails } = require("./ocr");

const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
 res.json({
  message:"NG PASS Backend API running with database"
 });
});


// REGISTER USER
app.post("/api/register",(req,res)=>{

 const { fullName, contact, identity, pin } = req.body;

 const exists = db.prepare(
  "SELECT * FROM users WHERE contact=?"
 ).get(contact);

 if(exists){
  return res.json({
   success:false,
   message:"Account already exists"
  });
 }

 const insert = db.prepare(`
  INSERT INTO users
  (fullName, contact, identity, pin, createdAt)
  VALUES (?,?,?,?,?)
 `);

 const hashedPin = bcrypt.hashSync(pin, 10);

 const result = insert.run(
  fullName,
  contact,
  identity,
  hashedPin,
  new Date().toISOString()
 );


 res.json({
  success:true,
  message:"User saved",
  id:result.lastInsertRowid
 });

});


// GET USERS TEST
app.get("/api/users",(req,res)=>{

 const users = db
 .prepare("SELECT * FROM users")
 .all();

 res.json(users);

});





// LOGIN USER
app.post("/api/login",(req,res)=>{

 const { contact, pin } = req.body;

 const user = db.prepare(
  "SELECT * FROM users WHERE contact=?"
 ).get(contact);

 if(user && !bcrypt.compareSync(pin, user.pin)){
  return res.json({
   success:false,
   message:"Invalid login details"
  });
 }


 if(!user){
  return res.json({
   success:false,
   message:"Invalid login details"
  });
 }


 res.json({
  success:true,
  message:"Login successful",
  user
 });

});




// OCR DOCUMENT SCAN
app.post("/api/ocr", upload.single("document"), async (req,res)=>{

 try{

  if(!req.file){
   return res.json({
    success:false,
    message:"No image uploaded"
   });
  }

  const text = await readTextFromImage(req.file.path);
  const details = extractDetails(text);

  res.json({
   success:true,
   details
  });

 }catch(error){

  res.json({
   success:false,
   message:"OCR failed",
   error:error.message
  });

 }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
 console.log("NG PASS API + Database running on",PORT);
});
