// models/adminModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  admin_id: { type: Number, unique: true },
  password: { type: String, required: true },
});

adminSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
