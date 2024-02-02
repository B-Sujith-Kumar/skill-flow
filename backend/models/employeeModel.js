const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
