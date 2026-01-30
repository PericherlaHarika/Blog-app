const express = require("express");
const cors = require("cors");

// Import route files
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const productRoutes = require("./routes/Products");

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
app.use("/api", authRoutes);

// Blog routes: /api/blogs, /api/blogs/:id
app.use("/api/blogs", blogRoutes);

// Product routes: /api/products
app.use("/api/products", productRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("MERN Blog API is running!");
});

// Export the configured app
module.exports = app;

// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";
// import blogRoutes from "./routes/blogs.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);

// export default app;
