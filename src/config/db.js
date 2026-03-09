const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://hanumansai72_db_user:1bzz278cMk1G4tgN@cluster0.mmul0uw.mongodb.net/mydatabase";

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;