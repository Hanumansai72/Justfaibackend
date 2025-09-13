// app.js
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const Signup = require("./src/models/Signup");


// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS setup

app.use(cors()); 

// Handle preflight requests

// --- DB Connection ---
const mongoURI = process.env.mongoURI_perment;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });



// --- Signup Route ---
app.post("/api/signup/freelancers/register", async (req, res) => {
  try {
    const {
      email,
      password,
      FullName,
      experienceYears,
      availability,
      PhoneNumber,
      Username,
      Skills,
      AboutMe,
      Country,
      Language,
      Title,
      portfolioFiles,
      resumeFile,
      hourlyRate,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const freelancer = new Signup({
      email,
      password: hashedPassword,
      FullName,
      experienceYears,
      availability,
      PhoneNumber,
      Username,
      Skills,
      AboutMe,
      Country,
      Language,
      Title,
      portfolioFiles,
      resumeFile,
      hourlyRate,
    });

    const savedFreelancer = await freelancer.save();

    res.status(201).json({
      success: true,
      message: "Freelancer registered successfully",
      data: savedFreelancer,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email, Phone, or Username already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to save freelancer",
      error: err.message,
    });
  }
});



// ❌ Do NOT use app.listen() in Vercel
app.listen(8031, () => {
  console.log("Server started on http://localhost:8031");
});