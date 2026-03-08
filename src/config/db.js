const mongoose = require("mongoose");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const connectDB = async (attempt = 1) => {
  const maxAttempts = 5;
  const uri = process.env.mongoURI;
  if (!uri) {
    throw new Error("mongoURI environment variable is not set");
  }

  const options = {
    serverSelectionTimeoutMS: 20000,
    socketTimeoutMS: 45000,
  };

  try {
    await mongoose.connect(uri, options);
    mongoose.set("bufferCommands", false);
    console.log("✅ Database connected");

    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));
    mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

    return true;
  } catch (err) {
    console.error(`❌ Failed to connect database (attempt ${attempt}/${maxAttempts}):`, err && err.message ? err.message : err);
    if (attempt < maxAttempts) {
      const delay = 2000 * attempt;
      console.log(`Retrying connection in ${delay}ms...`);
      await sleep(delay);
      return connectDB(attempt + 1);
    }
    throw err;
  }
};

module.exports = connectDB;
