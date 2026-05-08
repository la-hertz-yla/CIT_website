const { Sequelize } = require("sequelize");

const db = new Sequelize("cit_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

// Test connection and sync
db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.error("Database sync error:", err));

module.exports = db;