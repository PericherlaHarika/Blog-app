const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Step 1: Get the Authorization header
  // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  const authHeader = req.headers.authorization;

  // Step 2: Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Step 3: Extract the token (remove "Bearer " prefix)
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token format invalid" });
  }
  const token = parts[1];

  try {
    // Step 4: Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Step 5: Attach user ID to request object
    // Now controllers can access req.userId
    req.userId = decoded.userId;
    
    // Step 6: Proceed to the next middleware/controller
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
