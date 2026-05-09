const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, filiere, level, interests, phone, password } = req.body;

        console.log("Données reçues:", { firstName, lastName, email, filiere, level, interests, phone });

        // Validation des champs obligatoires
        if (!firstName || !lastName || !email || !filiere || !level || !password) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        console.log("Création de l'utilisateur...");
        // Create user (password will be hashed by hook)
        const user = await User.create({ 
            firstName, 
            lastName, 
            email, 
            filiere, 
            level, 
            interests: interests || [],
            phone,
            password 
        });

        console.log("Utilisateur créé:", user.toJSON());

        // Return user without password
        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.status(201).json({ 
            message: "Inscription réussie! Bienvenue dans CIT Club!", 
            user: userWithoutPassword 
        });
    } catch (err) {
        console.error("Erreur lors de l'inscription:", err);
        res.status(500).json({ message: "Erreur du serveur", error: err.message });
    }
};