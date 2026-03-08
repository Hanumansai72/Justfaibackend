const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./src/config/db");

dotenv.config();

// Ensure critical secrets are present. In production, exit if missing.
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    console.error("FATAL: JWT_SECRET environment variable is not set. Exiting.");
    process.exit(1);
  } else {
    console.warn("Warning: JWT_SECRET not set. Using a development fallback secret.");
    process.env.JWT_SECRET = "dev_jwt_secret_change_me";
  }
}

const PORT = process.env.PORT || 8031;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
