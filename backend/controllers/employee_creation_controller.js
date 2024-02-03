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
            socialProfileLinks
        } = req.body;

        // Create a new employee using the Employee model
        const newEmployee = await employeeCreation.create({
            personalInformation: {
                fullName,
                gender,
                dateOfBirth
            },
            contactInformation: {
                email,
                phoneNumber
            },
            positionAndDepartment: {
                jobTitle,
                department
            },
            employmentDetails: {
                employmentType,
                joiningDate
            },
            salaryInformation: {
                salaryStructure,
                paymentFrequency
            },
            credentials: {
                employeeID,
                initialPassword
            },
            additionalInformation: {
                reportingManager,
                workLocation,
                skills,
                resumeFile,
                socialProfileLinks
            }
        });

        // Respond with the created employee
        res.status(201).json({ success: true, employee: newEmployee });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'Duplicate employee ID or email.' });
        } else {
            console.error('Error creating employee:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
};

module.exports = {
    empCreate
};
