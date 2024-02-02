const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const empLogin = async (req, res) => {
    let success = false;
    const { empId, password } = req.body;
    console.log(empId, password);
    try {
        let emp = await Employee.findOne({ employeeId: empId });
        if (!emp) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, emp.password);
        if (!passwordMatch) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const data = {
            emp: {
                id: emp.id
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, token });
    }
    catch (error) {
        console.error("Error during employee login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    empLogin
};
