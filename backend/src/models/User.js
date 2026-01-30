const mongoose = require("mongoose");

// Define the schema (structure) for User documents
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // This field is mandatory
  },
  email: {
    type: String,
    required: true,
    unique: true,    // No two users can have same email
  },
  password: {
    type: String,
    required: true,
    // Note: This stores the HASHED password, not plain text
    // Example: "$2a$10$N9qo8uLOickgx2ZMRZoMy..."
  },
});

// Create and export the model
// "User" → MongoDB will create a "users" collection
module.exports = mongoose.model("User", userSchema);