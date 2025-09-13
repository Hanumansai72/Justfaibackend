const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const freelancerRoutes = require("./src/Route/FreelancerRoutes.routes.js");

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To enable Cross-Origin Resource Sharing

// --- API Routes ---
// Mount the freelancer routes on the /api/signup/freelancers path
app.use("/api/signup/freelancers", freelancerRoutes);

// --- Error Handler (Optional but Recommended) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app for Vercel
module.exports = app;
