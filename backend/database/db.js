require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
    }
};

module.exports = connectDB;
