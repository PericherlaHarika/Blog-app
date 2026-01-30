const Product = require("../models/Products");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => res.json(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NATURAL LANGUAGE SEARCH (AI-like)
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
