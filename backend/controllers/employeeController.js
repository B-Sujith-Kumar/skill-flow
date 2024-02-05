const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const employeeCreation = require("../models/employeeCreation");

const empCreate = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dateOfBirth,
      email,
      phoneNumber,
      jobTitle,
      department,
      employmentType,
      joiningDate,
      salaryStructure,
      paymentFrequency,
      employeeID,
      initialPassword,
      reportingManager,
      workLocation,
      skills,
      resumeFile,
      socialProfileLinks,
    } = req.body;

    // Create a new employee using the Employee model
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
        paymentFrequency,
      },
      credentials: {
        employeeID,
        initialPassword,
      },
      additionalInformation: {
        reportingManager,
        workLocation,
        skills,
        resumeFile,
        socialProfileLinks,
      },
    });

    // Respond with the created employee
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

module.exports = {
  empLogin,
  empCreate,
  empUpdate,
  deleteEmployee,
};
