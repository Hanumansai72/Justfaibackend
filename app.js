const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const userroutes = require("./src/Route/FreelancerRoutes.routes");
const clientroutes = require("./src/Route/ClientRoutes.routes");

const app = express();

// Connect to database for serverless environment
connectDB();

app.set('trust proxy', 1);
app.use(express.json());
app.use(cors());

app.use("/api/freelancers", userroutes);
app.use("/api/clients", clientroutes);



module.exports = app;
