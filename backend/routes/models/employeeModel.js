const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  employee_id: { type: Number, unique: true },
  password: { type: String, required: true },
});

employeeSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
