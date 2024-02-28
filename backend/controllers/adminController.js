const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const InternalJobPosting = require("../models/internalJobPosting");
require("dotenv").config();

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
                id: admin.id,
            },
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, token });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const jobCreate = async (req, res) => {
    try {
        const {
            title,
            jobid,
            department,
            location,
            description,
            responsibilities,
            requirements,
            education,
            experience,
            skills,
            employmentType,
            applicationDeadline,
            salary,
            contactEmail,
            reportingManager,
        } = req.body;
        console.log(req.body);
        const newInternalJob = await InternalJobPosting.create({
            title,
            jobid,
            department,
            location,
            description,
            responsibilities,
            requirements,
            education,
            experience,
            skills,
            employmentType,
            applicationDeadline,
            salary,
            contactEmail,
            reportingManager,
        });

        res.status(201).json({ success: true, job: newInternalJob });
    } catch (error) {
        if (error.code === 11000) {
            res
                .status(400)
                .json({ success: false, message: "Duplicate Job ID" });
        } else {
            console.error("Error creating Job:", error);
            res
                .status(500)
                .json({ success: false, message: "Internal server error." });
        }
    }
};


const searchJob = async (req, res) => {
    try {
        const jobid = req.params.jobid;

        const jobPosting = await InternalJobPosting.findOne({ jobid });

        if (!jobPosting) {
            console.log("Job not found with ID:", jobid);
            return res.status(404).json({
                success: false,
                message: "Job not found with the given JobId."
            });
        }

        res.status(200).json(jobPosting);

    } catch (error) {
        console.error("Error searching for Job:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while searching for Job."
        });
    }

}


const deleteJob = async (req, res) => {
    try {
        let { jobID } = req.body;
        jobID = Number.parseInt(jobID);
        console.log("JobID:", jobID)
        console.log("JobID:", typeof jobID);
        const jobid = jobID;
        if (!jobID) {
            return res.status(400).json({ error: "Jobid is required in the request body" });
        }

        const deletedJobPosting = await InternalJobPosting.findOneAndDelete({ jobid });
        console.log(deletedJobPosting);
        if (!deletedJobPosting) {
            return res.status(404).json({ success: false, message: "Job Posting not found." });
        }

        res.status(200).json({ message: "Job posting deleted successfully", deletedJobPosting });

    } catch (error) {

        console.error("Error deleting job posting:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    adminLogin,
    jobCreate,
    searchJob,
    deleteJob,
};
