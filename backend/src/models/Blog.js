const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      // This stores the User's ObjectId (reference)
      type: mongoose.Schema.Types.ObjectId,
      // "ref" tells Mongoose which model to use for population
      ref: "User",
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);