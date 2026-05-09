const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./cit_database.db",
    logging: console.log
});

// Test connection
db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

module.exports = db;