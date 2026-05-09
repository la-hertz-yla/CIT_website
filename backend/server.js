const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const db = require("./database/connection");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "../web-dev")));

// API Routes
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../web-dev/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
});

// Start server after database sync
const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        console.log("Database synchronized successfully");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to start server:", err);
        process.exit(1);
    });