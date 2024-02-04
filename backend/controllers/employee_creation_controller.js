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
  empCreate,
  empUpdate,
  deleteEmployee,
};
