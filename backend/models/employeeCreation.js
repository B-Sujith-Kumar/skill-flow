const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  personalInformation: {
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
  },
  contactInformation: {
    email: { type: String, required: true,unique: true},
    phoneNumber: { type: String, required: true },
  },
  positionAndDepartment: {
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
  },
  employmentDetails: {
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Temporary', 'Contract'], required: true },
    joiningDate: { type: Date, required: true },
  },
  salaryInformation: {
    salary: { type: Number, required: true },
  },
  credentials: {
    employeeID: { type: String, required: true,unique: true },
    Password: { type: String, required: true },
  },
  additionalInformation: {
    reportingManager: { type: String, required: true },
    workLocation: { type: String, required: true },
    skills: { type: [String], default: [] },
    resumeFile: { type: String },
    socialProfileLinks: { type: [String], default: [] },
  },
});

const Employee_Creation = mongoose.model('Employee_Creation', employeeSchema);

module.exports = Employee_Creation;
