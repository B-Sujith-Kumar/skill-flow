import AdminSidebar from "../components/AdminSidebar";
import "../App.css";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.css";

toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: true,
};

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    department: "",
    employmentType: "Full-time",
    joiningDate: "",
    salaryStructure: "",
    reportingManager: "",
    workLocation: "",
    employeeID: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const updatedFormData = {
        ...formData,
        fullName: formData.firstName + formData.middleName + formData.lastName,
      };

      setFormData(updatedFormData);
      console.log(formData);
      try {
        const response = await fetch("http://localhost:3000/api/admin/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (
          !response.ok ||
          response.status === 400 ||
          response.message === "Duplicate employee ID or email."
        ) {
          toastr.error("Duplicate Employee ID or email", "Error");
        } else if (response.ok) {
          toastr.success("Employee Added Succesfully", "Success");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    if (!data.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }

    if (!data.department.trim()) {
      errors.department = "Department is required";
    }

    if (!data.employmentType.trim()) {
      errors.employmentType = "Employment type is required";
    }

    if (!data.joiningDate) {
      errors.joiningDate = "Joining Date is required";
    }

    if (!data.salaryStructure.trim()) {
      errors.salaryStructure = "Salary structure is required";
    }

    if (!data.reportingManager.trim()) {
      errors.reportingManager = "Reporting Manager is required";
    }

    if (!data.workLocation.trim()) {
      errors.workLocation = "Work location is required";
    }

    if (!data.employeeID.trim()) {
      errors.employeeID = "Employee ID is required";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Employee Management / Add an Employee
        </p>
        <h2 className="text-3xl mt-2 font-medium text-slate-800">
          Add an employee
        </h2>
        <form action="" className="mt-8 pb-6" onSubmit={handleSubmit}>
          <div className="border-[1px] border-slate-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Middle name (optional)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="middleName"
                    id="middle-name"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    autoComplete="middle-name"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    autoComplete="gender-type"
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="dob"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dob"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                  {formErrors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="phnumber"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="phnumber"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    autoComplete="phnumber"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                    minLength={10}
                    maxLength={10}
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-[1px] border-slate-300 pb-12 bg-white px-7 pt-4 mt-8 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')]">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Designation Details
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="jobtitle"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Job title <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="jobtitle"
                    name="jobTitle"
                    autoComplete="job-title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option value="">Select</option>
                    <optgroup label="JL 7" className="font-bold">
                      <option value="JL 7A">JL 7A</option>
                      <option value="JL 7B">JL 7B</option>
                    </optgroup>
                    <optgroup label="JL 6" className="font-bold">
                      <option value="JL 6A">JL 6A</option>
                      <option value="JL 6B">JL 6B</option>
                    </optgroup>
                    <optgroup label="JL 5" className="font-bold">
                      <option value="JL 5A">JL 5A</option>
                      <option value="JL 5B">JL 5B</option>
                    </optgroup>
                    <optgroup label="JL 4" className="font-bold">
                      <option value="JL 4A">JL 4A</option>
                      <option value="JL 4B">JL 4B</option>
                    </optgroup>
                    <optgroup label="JL 3" className="font-bold">
                      <option value="JL 3A">JL 3A</option>
                      <option value="JL 3B">JL 3B</option>
                    </optgroup>
                  </select>
                </div>
                {formErrors.jobTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.jobTitle}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleInputChange}
                    autoComplete="department"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
                {formErrors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.department}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="emp-type"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Employee type <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="emp-type"
                    name="employmentType"
                    autoComplete="emp-type"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option value="">Select</option>
                    <option value="Full-time">Full time</option>
                    <option value="Part-time">Part time</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                {formErrors.employmentType && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.employmentType}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="date-of-joining"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Joining Date <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="joiningDate"
                    id="date-of-joining"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
                {formErrors.joiningDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.joiningDate}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="salary"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Salary structure <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="salary"
                    name="salaryStructure"
                    type="number"
                    value={formData.salaryStructure}
                    onChange={handleInputChange}
                    autoComplete="salary"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
                {formErrors.salaryStructure && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.salaryStructure}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="reporting-manager"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Reporting Manager <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="reporting-manager"
                    name="reportingManager"
                    type="text"
                    value={formData.reportingManager}
                    onChange={handleInputChange}
                    autoComplete="reporting-manager"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
                {formErrors.reportingManager && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.reportingManager}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="work-location"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Work location <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="work-location"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={handleInputChange}
                    autoComplete="work-location"
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option value="">Select</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                {formErrors.workLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.workLocation}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-[1px] border-slate-300 pb-12 bg-white px-7 pt-4 mt-8 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')]">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Employee Credentials
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="employee-id"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="employee-id"
                    name="employeeID"
                    type="text"
                    value={formData.employeeID}
                    onChange={handleInputChange}
                    autoComplete="employee-id"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
                {formErrors.employeeID && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.employeeID}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    autoComplete="password"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="min-w-full flex justify-center mt-6 gap-10">
            <button
              type="reset"
              className="border-[1px] border-slate-400 px-7 py-2 text-coral-green font-medium rounded-sm hover:rounded-full hover:border-coral-green transition-all duration-300 ease-in-out"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-coral-green px-7 py-2 text-white font-medium rounded-sm hover:rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
