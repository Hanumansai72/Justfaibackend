  const mongoose=require("mongoose")

  const FreelancerSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      role: {
        type: String,
        default: "freelancer",
      },
      password: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      experienceYears: {
        type: String,
        required: true,
        min: 0,
        max: 50,
      },
      availability: {
        type: String,
        enum: ["Full-time", "Part-time", "Flexible"],
        default: "Flexible",
      },
      phoneNumber: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      skills: {
        type: [String],
        default: [],
      },
      aboutMe: {
        type: String,
        required: true,
        minlength: 20,
      },
      country: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        default: "English",
      },
      title: {
        type: String,
        required: true,
      },
      portfolioLinks: {
        github: String,
        linkedin: String,
        website: String,
      },
      hourlyRate: {
        type: Number,
        min: 0,
        default: 0,
      },
      idVerified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Freelancer", FreelancerSchema);
