const mongoose = require("mongoose");

const internalJobPostingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    jobid: {
        type: Number,
        unique: true,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    responsibilities: [String],
    requirements: [String],
    education: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    skills: [String],
    employmentType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Temporary"],
        required: true,
    },
    applicationDeadline: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    reportingManager: {
        type: String,
        required: true,
    },
    openings: {
        type: Number,
        required: true,
    },
    applicants: {
        type: [String], default: [],
    },
});
const InternalJobPosting = mongoose.model(
    "InternalJobPosting",
    internalJobPostingSchema
);

module.exports = InternalJobPosting;
