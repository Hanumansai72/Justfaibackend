const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const Signup = require("./src/models/Signup");
const jwt = require("jsonwebtoken");



dotenv.config();

const app = express();

app.use(express.json());


app.use(cors()); 


const mongoURI = process.env.mongoURI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
//function checking authenticate users
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


// --- Freelancer Signup Route ---
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
app.post("/api/freelancers/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const freelancer = await Signup.findOne({ email });
    if (!freelancer) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, freelancer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: freelancer._id, email: freelancer.email },
      JWT_SECRET,
      { expiresIn: "1h" } // expires in 1 hour
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: freelancer._id,
        email: freelancer.email,
        name: freelancer.name, // adjust as needed
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(8031, () => {
  console.log("Server started on http://localhost:8031");
});