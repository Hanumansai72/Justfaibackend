const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Signup = require("../models/Signup.model.js");
const cloudinary=require("../middlewares/cloudnary.middleware.js")

async function upload(req,res) {
  try{
    console.log("called")
  const cloudinarys= await cloudinary.uploader.upload("C://JustFai//Backend//344.PNG")


  res.status(200).json({
    message:cloudinarys.secure_url
  })
  }
  catch(err){
    console.log(err)
  }

  
}

async function usersignup(req, res) {
  try {
    const {
      email,
      password,
      fullName,
      experienceYears,
      availability,
      phoneNumber,
      username,
      skills,
      aboutMe,
      country,
      language,
      title,
      portfolioFiles,
      hourlyRate,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Signup.create({
      email,
      password: hashedPassword,
      fullName,
      experienceYears,
      availability,
      phoneNumber,
      username,
      skills,
      aboutMe,
      country,
      language,
      title,
      portfolioFiles,
      hourlyRate,
    });

    return res.status(201).json({
      success: true,
      message: "Freelancer registered successfully",
    });
  } catch (err) {
  console.error(" SIGNUP ERROR:", err);
  return res.status(500).json({
    success: false,
    message: err.message,
  
  });

    
  }
}


async function userlogin(req, res) {
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
      { id: freelancer._id, email: freelancer.email ,role:freelancer.role},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: freelancer._id,
        email: freelancer.email,
        fullName: freelancer.fullName,
      },
    });
  } catch (err) {
  console.error("🔥 SIGNUP ERROR:", err);
  return res.status(500).json({
    success: false,
    message: err.message,
  });

    
  }
}
async function getprofile(req, res) {
  try {
    const userId = req.user.id; 

    const profile = await Signup.findById(userId).select(
      "-password -__v"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
}


module.exports = {
  usersignup,
  userlogin,
  getprofile,
  upload
};
