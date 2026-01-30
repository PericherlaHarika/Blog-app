const express = require("express");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ============== PUBLIC ROUTES ==============
// No authentication required

// GET /api/blogs - Get all blogs
router.get("/", getBlogs);

// GET /api/blogs/:id - Get single blog by ID
router.get("/:id", getBlogById);

// ============== PROTECTED ROUTES ==============
// Authentication required (auth middleware)

// POST /api/blogs - Create new blog
router.post("/", auth, createBlog);

// PUT /api/blogs/:id - Update blog
router.put("/:id", auth, updateBlog);

// DELETE /api/blogs/:id - Delete blog
router.delete("/:id", auth, deleteBlog);

module.exports = router;