const express = require("express");
const cors = require("cors");

const userroutes = require("./src/Route/FreelancerRoutes.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userroutes);



module.exports = app;
