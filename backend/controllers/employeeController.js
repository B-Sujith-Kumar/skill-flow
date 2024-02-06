const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeeCreation = require("../models/employeeCreation");
require("dotenv").config();

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
                id: emp.id,
            },
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, token });
    } catch (error) {
        console.error("Error during employee login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const empCreate = async (req, res) => {
    try {
        let {
            firstName,
            lastName,
            middleName,
            gender,
            dateOfBirth,
            email,
            phoneNumber,
            jobTitle,
            department,
            employmentType,
            joiningDate,
            salaryStructure,
            employeeID,
            password,
            reportingManager,
            workLocation,
        } = req.body;

        let fullName = firstName + " " + middleName + " " + lastName;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        console.log(password);
        dateOfBirth = new Date(dateOfBirth);
        joiningDate = new Date(joiningDate);

        const newEmployee = await employeeCreation.create({
            personalInformation: {
                fullName,
                gender,
                dateOfBirth,
            },
            contactInformation: {
                email,
                phoneNumber,
            },
            positionAndDepartment: {
                jobTitle,
                department,
            },
            employmentDetails: {
                employmentType,
                joiningDate,
            },
            salaryInformation: {
                salaryStructure,
            },
            credentials: {
                employeeID,
                password,
            },
            additionalInformation: {
                reportingManager,
                workLocation,
            },
        });

        res.status(201).json({ success: true, employee: newEmployee });
    } catch (error) {
        if (error.code === 11000) {
            res
                .status(400)
                .json({ success: false, message: "Duplicate employee ID or email." });
        } else {
            console.error("Error creating employee:", error);
            res
                .status(500)
                .json({ success: false, message: "Internal server error." });
        }
    }
};

const empUpdate = async (req, res) => {
    try {
        const { employeeID, updatedData } = req.body;
        const updatedEmployee = await employeeCreation.findOneAndUpdate(
            { "credentials.employeeID": employeeID },
            { $set: updatedData },
            { new: true }
        );
        if (!updatedEmployee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found." });
        }
        res.status(200).json({ success: true, employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { employeeID } = req.body;
        const deletedEmployee = await employeeCreation.findOneAndDelete({
            "credentials.employeeID": employeeID,
        });
        if (!deletedEmployee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found." });
        }
        res.status(200).json({ success: true, employee: deletedEmployee });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


const searchEmployee = async(req,res)=>{
    try {
        const employeeId = req.params.employeeId;
    
        // Use findOne to find an employee based on the employeeId
        const foundEmployee = await employeeCreation.findOne({
          "credentials.employeeID": employeeId
        });
    
        if (!foundEmployee) {
          console.log("Employee not found with ID:", employeeId);
          return res.status(404).json({
            success: false,
            message: "Employee not found with the given employeeId."
          });
        }
    
        console.log("Employee found:", foundEmployee);
    
        res.status(200).json({
          success: true,
          employee: foundEmployee
        });
      } catch (error) {
        console.error("Error searching for employee:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error while searching for employee."
        });
      }
};

module.exports = {
    empLogin,
    empCreate,
    empUpdate,
    deleteEmployee,
    searchEmployee,
};
