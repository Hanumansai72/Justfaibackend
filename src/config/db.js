const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.mongoURI) {
      throw new Error("mongoURI environment variable is not set");
    }

    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
