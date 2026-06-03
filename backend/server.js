const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "NG PASS Backend API is running",
  });
});

app.post("/api/register", (req, res) => {
  res.json({
    success: true,
    message: "Demo user registered",
    user: req.body,
  });
});

app.post("/api/login", (req, res) => {
  res.json({
    success: true,
    message: "Demo login successful",
    token: "demo-token",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NG PASS API running on port ${PORT}`);
});
