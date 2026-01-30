const Blog = require("../models/Blog");

// ==================== GET ALL BLOGS (Public) ====================
exports.getBlogs = async (req, res) => {
  try {
    // Find all blogs and populate author field with username
    // .populate() replaces the author ObjectId with actual user data
    const blogs = await Blog.find()
      .populate("author", "username")  // Only get username from User
      .sort({ createdAt: -1 });        // Newest first

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== GET SINGLE BLOG (Public) ====================
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "username");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== CREATE BLOG (Protected) ====================
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // req.userId comes from authMiddleware
    const blog = await Blog.create({
      title,
      content,
      author: req.userId,  // Set current user as author
    });

    // Populate author info before sending response
    await blog.populate("author", "username");

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== UPDATE BLOG (Protected + Owner Only) ====================
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find the blog first
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if current user is the author
    // blog.author is ObjectId, req.userId is string
    // .toString() converts ObjectId to string for comparison
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to edit this blog" });
    }

    // Update the blog
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    await blog.populate("author", "username");
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== DELETE BLOG (Protected + Owner Only) ====================
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check ownership
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};