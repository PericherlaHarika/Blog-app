const express = require("express");
const cors = require("cors");

// Import route files
// const authRoutes = require("./routes/auth");
// const blogRoutes = require("./routes/blogs");

// Create Express application
const app = express();

// ============== MIDDLEWARE ==============
// Middleware runs on EVERY request before reaching routes

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend (port 5173) to communicate with backend (port 5000)
app.use(cors());

// Parse JSON request bodies
// Without this, req.body would be undefined
app.use(express.json());

// ============== ROUTES ==============
// Mount route handlers at specific paths

// Auth routes: /api/signup, /api/login
// app.use("/api", authRoutes);

// Blog routes: /api/blogs, /api/blogs/:id
// app.use("/api/blogs", blogRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("MERN Blog API is running!");
});

// Export the configured app
module.exports = app;