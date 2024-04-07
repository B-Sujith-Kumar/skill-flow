const Employee = require("../models/employeeCreation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeeCreation = require("../models/employeeCreation");
const nodemailer = require("nodemailer");
const cloudinary = require('../utils/cloudinary');
require("dotenv").config();

const empLogin = async (req, res) => {
    let success = false;
    const { empId, password } = req.body;
    try {
        let emp = await Employee.findOne({ 'credentials.employeeID': empId });
        if (!emp) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, emp.credentials.password);
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
        res.json({ success, token, firstLogin: emp.additionalInformation.firstLogin, empId: emp.credentials.employeeID });
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

        let fullName = firstName + ' ' + middleName + ' ' + lastName;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        dateOfBirth = new Date(dateOfBirth);
        joiningDate = new Date(joiningDate);

        console.log(req.body);


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

        console.log("New Employee : ", newEmployee);

        //         const transporter = nodemailer.createTransport({
        //             service: "gmail",
        //             host: "smtp.gmail.com",
        //             port: 587,
        //             secure: false,
        //             auth: {
        //                 user: process.env.USER,
        //                 pass: process.env.PASSCODE,
        //             },
        //         });

        //         const mailOptions = {
        //             from: {
        //                 name: "SkillFlow",
        //                 address: process.env.USER,
        //             },
        //             to: email,
        //             subject: "Account ID and Password",
        //             text: `Welcome to SkillFlow, Congratulations, Your account has been created successfully.
        // Your EmployeeId is ${employeeID} and your Initial Password is password123.
        // Kindly Login to your Account to complete the Profile.`,
        //         };

        //         await transporter.sendMail(mailOptions);
        //         console.log("Email sent successfully.");

        res.status(201).json({ success: true, employee: newEmployee, message: "Employee created and email sent successfully." });


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

        const existingEmployee = await employeeCreation.findOne({ "credentials.employeeID": employeeID });

        if (!existingEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        const mergedData = { ...existingEmployee.toObject(), ...updatedData };

        const updatedEmployee = await employeeCreation.findOneAndUpdate(
            { "credentials.employeeID": employeeID },
            { $set: mergedData },
            { new: true }
        );

        res.status(200).json({ success: true, employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


const deleteEmployee = async (req, res) => {
    try {
        console.log("Entered");
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


const searchEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;

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

const empSetPassword = async (req, res) => {
    try {
        console.log("Entered here");
        const { password, employeeID } = req.body;
        console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const emp = await Employee.findOneAndUpdate(
            { 'credentials.employeeID': employeeID },
            {
                $set: {
                    'credentials.password': hashedPassword,
                }
            },
            { new: true }
        );

        if (!emp) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error setting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;

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
}

const profileImage = async (req, res) => {
    try {
        const { employeeID, image } = req.body;
        const result = await cloudinary.uploader.upload(image, {
            folder: "profileImages",
        });
        console.log(result.secure_url);
        const emp = await Employee.findOneAndUpdate(
            { 'credentials.employeeID': employeeID },
            {
                $set: {
                    'additionalInformation.profileImage': result.secure_url,
                }
            },
            { new: true }
        );
        res.status(200).json({ success: true, url: result.secure_url });
    } catch (error) {
        console.error("Error setting profile image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updatedEmployee = async (req, res) => {
    const { employeeID, finalForm } = req.body;
    console.log(employeeID, finalForm);
    try {
        const emp = await Employee.findOneAndUpdate(
            { 'credentials.employeeID': employeeID },
            {
                $set: {
                    'personalInformation.fullName': finalForm.fullName,
                    'personalInformation.gender': finalForm.gender,
                    'personalInformation.dateOfBirth': finalForm.dateOfBirth,
                    'contactInformation.email': finalForm.email,
                    'contactInformation.phoneNumber': finalForm.phoneNumber,
                    'additionalInformation.socialProfileLinks': finalForm.socialProfileLinks,
                    'additionalInformation.firstLogin': false,
                    'additionalInformation.skills': finalForm.skills,
                }
            },
            { new: true }
        );
        res.status(200).json({ success: true, employee: emp });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    empLogin,
    empCreate,
    empUpdate,
    deleteEmployee,
    searchEmployee,
    empSetPassword,
    getEmployee,
    profileImage,
    updatedEmployee
};
