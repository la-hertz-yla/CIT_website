const User = require("../models/User");

// Middleware to verify JWT token (if implemented)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    // Basic token validation (in production, use JWT)
    try {
        // Decode token and verify
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// Middleware to check if email exists
const checkEmailExists = async (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
        return next();
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: "Email already registered" });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    verifyToken,
    checkEmailExists
};
