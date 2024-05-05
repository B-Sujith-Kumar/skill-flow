const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    personalInformation: {
        fullName: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        dateOfBirth: { type: Date, required: true },
    },
    contactInformation: {
        email: { type: String, required: true, unique: true },
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
        salaryStructure: { type: Number, required: true },
    },
    credentials: {
        employeeID: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    additionalInformation: {
        reportingManager: { type: String, required: true },
        workLocation: { type: String, required: true },
        skills: { type: [String], default: [] },
        resumeFile: { type: String, default: "" },
        socialProfileLinks: { type: [String], default: [] },
        firstLogin: { type: Boolean, default: true },
        profileImage: { type: String, default: 'https://imagedelivery.net/jP_2Cu8opO0otIERyhqaNQ/71854130-0d5f-4028-37ce-35dfd6007500/public' }
    },
    appliedJobs: [{
        jobId: { type: String },
        jobTitle: { type: String },
        salary: { type: Number },
        experience : {type: String},
        status: { type: String, default: 'Applied' },
    }]
});

const Employee_Creation = mongoose.model('Employee_Creation', employeeSchema);

module.exports = Employee_Creation;
