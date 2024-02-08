const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const InternalJobPosting = require('../models/internalJobPostingModel');
require('dotenv').config();

const adminLogin = async (req, res) => {
    let success = false;
    const { adminId, password } = req.body;
    console.log(adminId, password);
    try {
        let admin = await Admin.findOne({ adminId: adminId });
        if (!admin) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password.trim(), admin.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, token });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const jobCreate = async(req,res)=>{
        try {
          // Extract job details from the request body
          const {
            title,
            department,
            location,
            description,
            responsibilities,
            requirements,
            qualifications,
            employmentType,
            applicationDeadline,
            salary,
            contactEmail,
            reportingManager,
          } = req.body;
      
          // Create a new internal job posting
          const newInternalJob = await InternalJobPosting.create({
            title,
            department,
            location,
            description,
            responsibilities,
            requirements,
            qualifications,
            employmentType,
            applicationDeadline,
            salary,
            contactEmail,
            reportingManager,
          });
      
          res.status(201).json({ success: true, job: newInternalJob });
        } catch (error) {
          console.error('Error creating internal job:', error);
          res.status(500).json({ success: false, message: 'Internal server error.' });
        }
     
};


module.exports = {
    adminLogin,
    jobCreate
};
