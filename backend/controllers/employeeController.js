// controllers/employeeController.js

const Employee = require("../models/employeeModel");
const bcrypt = require("bcrypt");

const employeeController = {
  login: async (req, res) => {
    const { employeeId, password } = req.body;

    try {
      const employee = await Employee.findOne({ employee_id: employeeId });

      if (!employee || !bcrypt.compareSync(password, employee.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // You might want to generate a token here and send it back to the client
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during employee login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = employeeController;
