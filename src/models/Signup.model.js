const mongoose=require("mongoose")

const Signupschema=new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role:{
    type:String,
    default:"freelancer"
  },
  password:{
    type:String,
    required:true
  },
  FullName:{
    type:String,
    required:true
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  availability: {
    type: String,
    enum: ["Full-time", "Part-time", "Flexible"],
    default: "Flexible",
  },
  PhoneNumber:{
    type:Number,
    required:true,
    unique:true
  },
  Username:{
    type:String,
    required:true,
    unique:true
  },
  Skills: {
  type: [String],
  default: []
},

  AboutMe:{
    type:String,
    required:true
  },
  Country:{
    type:String,
    required:true
  },
  Language:{
    type:String
  },
  Title:{
    type:String,
    required:true
  },
  portfolioFiles: [
    {
      fileName: String,
      fileUrl: String, 
      fileType: String, 
    },
  ],
  resumeFile: {
    fileName: String,
    fileUrl: String,
    fileType: String,
  },

  hourlyRate: {
    type: Number,
    default: 0,
  },
  idVerified: {
    type: Boolean,
    default: false,
  },
},{ timestamps: true });

module.exports =  mongoose.model("Freelancer", Signupschema);
