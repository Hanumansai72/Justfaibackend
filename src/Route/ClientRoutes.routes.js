const express = require("express");
const { body } = require("express-validator");
const { validateRequest } = require("../middlewares/validate.middleware");
const ratelimiter=require("../middlewares/RateLimiter.middleware")
const authenticate=require("../middlewares/Auth.middleware")
const {clientSignup,clientLogin,getprofile}=require("../controllers/ClientRegister.controller")
const { createProject ,addMilestone,getallproject,getprojectbyid} = require("../controllers/ClientProject.controller");
const router = express.Router();

router.post(
    "/register",
    [body("email").isEmail().withMessage("Invalid email"),
     body("password").isLength({ min: 8 }).withMessage("Password too short"),
     body("fullName").notEmpty().withMessage("Full name required")]
    ,validateRequest,ratelimiter,clientSignup)
router.post(
    "/login",
    [body("email").isEmail().withMessage("Invalid email"),
     body("password").notEmpty().withMessage("Password required")]
    ,validateRequest,ratelimiter,clientLogin)
router.get("/profile",authenticate,getprofile)
router.post("/postproject",authenticate,createProject)
router.post("/addmilestone/:projectId",authenticate,addMilestone)
router.get("/getprojects",authenticate,getallproject)
router.get("/getproject/:projectId",authenticate,getprojectbyid)    
module.exports = router;