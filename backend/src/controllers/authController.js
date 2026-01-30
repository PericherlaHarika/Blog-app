const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==================== SIGNUP ====================
exports.signup = async (req, res) => {
  try {
    // Step 1: Extract data from request body
    const { username, email, password } = req.body;

    // Step 2: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Step 3: Hash the password (NEVER store plain text passwords!)
    // bcrypt.hash(password, saltRounds)
    // Salt rounds = 10 means 2^10 iterations (good balance of security/speed)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create new user in database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Step 5: Send success response
    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== LOGIN ====================
exports.login = async (req, res) => {
  try {
    // Step 1: Extract credentials from request
    const { email, password } = req.body;

    // Step 2: Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Does not Found" });
    }

    // Step 3: Compare password with stored hash
    // bcrypt.compare() handles the hashing internally
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Step 4: Generate JWT token
    // jwt.sign(payload, secret, options)
    const token = jwt.sign(
      { userId: user._id },           // Payload (data stored in token)
      process.env.JWT_SECRET,          // Secret key for signing
      { expiresIn: "24h" }             // Token expires in 24 hours
    );

    // Step 5: Send token and user info
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}