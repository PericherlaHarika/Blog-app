const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// POST /api/signup - Register new user
router.post("/signup", signup);

// POST /api/login - Login existing user
router.post("/login", login);

module.exports = router;