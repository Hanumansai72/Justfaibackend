const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./src/config/db");

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8031;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
