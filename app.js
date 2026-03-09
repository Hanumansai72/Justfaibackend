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
app.use(cors({
    origin: ['http://localhost:3000', 'https://justfaiclients.vercel.app'],
    credentials: true,
}));

app.use("/api/freelancers", userroutes);
app.use("/api/clients", clientroutes);



module.exports = app;
