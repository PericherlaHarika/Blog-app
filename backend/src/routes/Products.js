const express = require("express");
const {
  getProducts,
  searchProducts
} = require("../controllers/ProductControllers");

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProducts);

module.exports = router;
