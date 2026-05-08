const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create user (password will be hashed by hook)
        const user = await User.create({ name, email, password });

        // Return user without password
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};