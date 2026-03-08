const mongoose = require("mongoose");

const connectDB = async (attempt = 1) => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Database already connected.");
    return;
  }

  try {
    const maxAttempts = 5;
    const uri = "mongodb+srv://hanumansai72_db_user:1bzz278cMk1G4tgN@cluster0.mmul0uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    if (!uri) {
      throw new Error("mongoURI environment variable is not set");
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Database Connected");
    return true;
  } catch (err) {
    console.error("❌ Failed to connect database", err.message);
    throw err;
  }
};

module.exports = connectDB;
