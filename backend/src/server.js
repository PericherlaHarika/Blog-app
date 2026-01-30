// Load environment variables from .env file
require("dotenv").config();

// Import mongoose for database connection
const mongoose = require("mongoose");

// Import our configured Express app
const app = require("./app");

// Get values from environment or use defaults
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mern_blog_dev";

// Connect to MongoDB first, THEN start the server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb");
    // Only start listening after DB is connected
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection error", err);
    process.exit(1); // Exit with error code
  });
