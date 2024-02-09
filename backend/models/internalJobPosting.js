const mongoose = require("mongoose");

const internalJobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobid: Number,
  department: {
    type: String,
    required: true,
  },
  location: String,
  description: {
    type: String,
    required: true,
  },
  responsibilities: [String],
  requirements: [String],
  qualifications: {
    education: String,
    experience: String,
    skills: [String],
  },
  employmentType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Temporary"],
    required: true,
  },
  applicationDeadline: Date,
  salary: Number,
  contactEmail: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  additionalInformation: {
    reportingManager: { type: String, required: true },
  },
});

const InternalJobPosting = mongoose.model(
  "InternalJobPosting",
  internalJobPostingSchema
);

module.exports = InternalJobPosting;
