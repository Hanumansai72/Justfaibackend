const express = require("express");
const { body } = require("express-validator");
const { usersignup, userlogin,getprofile,upload } = require("../controllers/UserRegister.controller");
const { validateRequest } = require("../middlewares/validate.middleware");
const ratelimiter=require("../middlewares/RateLimiter.middleware")
const authenticate=require("../middlewares/Auth.middleware")

const router = express.Router();

router.get("/upload",upload)

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 8 }).withMessage("Password too short"),
    body("fullName").notEmpty().withMessage("Full name required"),
  ],
  validateRequest,
  ratelimiter,
  usersignup
);

router.get("/profile",authenticate,getprofile)

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  validateRequest,
  ratelimiter,
  userlogin
);

module.exports = router;
