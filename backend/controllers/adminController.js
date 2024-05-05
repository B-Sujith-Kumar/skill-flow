const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const InternalJobPosting = require("../models/internalJobPosting");
const Employee = require("../models/employeeCreation");
require("dotenv").config();

const adminLogin = async (req, res) => {
    let success = false;
    const { adminId, password } = req.body;
    try {
        let admin = await Admin.findOne({ adminId: adminId });
        if (!admin) {
            return res.status(400).json({ success, message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password.trim(), admin.password);
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
        res.json({ success, token, isAdmin: true });
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
            openings
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
            openings
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


const displayjob = async (req, res) => {

    try {
        const recentJobPostings = await InternalJobPosting.find()
            .sort({ publishedAt: -1 })
            .limit(8);

        res.status(200).json(recentJobPostings);

    } catch (error) {

        console.error("Error getting recent job postings:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}

const displayAllJobs = async (req, res) => {

    try {
        const allJobPostings = await InternalJobPosting.find()
            .sort({ publishedAt: 1 });

        res.status(200).json(allJobPostings);
    } catch (error) {
        console.error("Error getting all job postings:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getDepartments = async (req, res) => {
    try {
        const departments = await InternalJobPosting.distinct("department");
        res.status(200).json(departments);
    } catch (err) {
        console.log("Error getting the departments:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const adminProfile = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        const adminId = "160121737107";
        const admin = await Admin.findOne({ adminId });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found.' });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: 'New password and confirm new password do not match.' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedNewPassword;
        await admin.save();

        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }

}

const applicants = async (req, res) => {
    try {
        const jobid = req.params.jobid;

        const applicants = await Employee.find({ "appliedJobs.jobId": jobid });

        if (!applicants) {

            return res.status(404).json({ error: "No applicants found for this job" });
        }

        res.status(200).json(applicants);
    } catch (error) {

        console.error("Error getting applicants for job:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getExpiredJobs = async (req, res) => {
    try {
        const expiredJobs = await InternalJobPosting.find({
            applicationDeadline: { $lt: Date.now() }
        });

        res.status(200).json(expiredJobs);
    } catch (error) {
        console.error("Error getting expired jobs:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { jobid } = req.params;
        const { employeeID, status } = req.body;
        const employee = await Employee.findOne({ "credentials.employeeID": employeeID });
        const job = await InternalJobPosting.findOne({ jobid });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        const jobIndex = employee.appliedJobs.findIndex(job => job.jobId === jobid);
        if (jobIndex === -1) {
            return res.status(404).json({ error: "Job not found" });
        }
        const notificationMessage = `Your application for job ${job.title} (${jobid}) has been updated to ${status}.`;
        employee.appliedJobs[jobIndex].status = status;
        employee.additionalInformation.notifications.push({
            message: notificationMessage
        });
        await employee.save();
        res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}




module.exports = {
    adminLogin,
    jobCreate,
    searchJob,
    deleteJob,
    displayjob,
    displayAllJobs,
    getDepartments,
    adminProfile,
    applicants,
    getExpiredJobs,
    updateStatus
};
