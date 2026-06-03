const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");

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

 const { fullName, contact, identity } = req.body;

 const insert = db.prepare(`
  INSERT INTO users
  (fullName, contact, identity, createdAt)
  VALUES (?,?,?,?)
 `);

 const result = insert.run(
  fullName,
  contact,
  identity,
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

 const { contact } = req.body;

 const user = db.prepare(
  "SELECT * FROM users WHERE contact=?"
 ).get(contact);


 if(!user){
  return res.json({
   success:false,
   message:"User not found"
  });
 }


 res.json({
  success:true,
  message:"Login successful",
  user
 });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
 console.log("NG PASS API + Database running on",PORT);
});
