const EmployeeDetails = ({ employeeData }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">
        Employee Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">Personal Information</h3>
          <p className="">
            <strong>Full Name:</strong>{" "}
            {employeeData.personalInformation.fullName}
          </p>
          <p className="mt-4">
            <strong>Gender:</strong> {employeeData.personalInformation.gender}
          </p>
          <p className="mt-4">
            <strong>Date of Birth:</strong>{" "}
            {new Date(
              employeeData.personalInformation.dateOfBirth
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">Contact Information</h3>
          <p>
            <strong>Email:</strong> {employeeData.contactInformation.email}
          </p>
          <p className="mt-4">
            <strong>Phone Number:</strong>{" "}
            {employeeData.contactInformation.phoneNumber}
          </p>
        </div>

        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">
            Position and Department
          </h3>
          <p>
            <strong>Job Title:</strong>{" "}
            {employeeData.positionAndDepartment.jobTitle}
          </p>
          <p className="mt-4">
            <strong>Department:</strong>{" "}
            {employeeData.positionAndDepartment.department}
          </p>
        </div>

        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">Employment Details</h3>
          <p>
            <strong>Employment Type:</strong>{" "}
            {employeeData.employmentDetails.employmentType}
          </p>
          <p className="mt-4">
            <strong>Joining Date:</strong>{" "}
            {new Date(
              employeeData.employmentDetails.joiningDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">Salary Information</h3>
          <p>
            <strong>Salary Structure:</strong>{" "}
            {employeeData.salaryInformation.salaryStructure.toLocaleString()}
          </p>
        </div>

        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">Credentials</h3>
          <p>
            <strong>Employee ID:</strong> {employeeData.credentials.employeeID}
          </p>
          {/* Password should not be displayed for security reasons */}
        </div>

        <div className="border p-4 shadow-sm rounded-lg border-slate-300 transition duration-300 ease-in-out transform hover:scale-100 hover:shadow-lg">
          <h3 className="text-coral-green text-xl font-semibold mb-3">Additional Information</h3>
          <p>
            <strong>Reporting Manager:</strong>{" "}
            {employeeData.additionalInformation.reportingManager}
          </p>
          <p className="mt-4">
            <strong>Work Location:</strong>{" "}
            {employeeData.additionalInformation.workLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
