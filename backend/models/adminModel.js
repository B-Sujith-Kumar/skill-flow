
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminId: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
