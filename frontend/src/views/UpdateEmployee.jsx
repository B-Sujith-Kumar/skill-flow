import AdminSidebar from "../components/AdminSidebar";
import "../App.css";
import { useState } from "react";
import toastr from "toastr";
import { BeatLoader } from "react-spinners";
import MobileAdminSidebar from "../components/MobileAdminSidebar";

const UpdateEmployee = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const handleSearch = async (e) => {
    console.log("Employee ID: ", employeeID);
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toastr.error("You need to login first!", "Error");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/api/admin/search/${employeeID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok && response.status === 404) {
        setError("Employee not found");
        console.log("Employee not found");
        toastr.error("Uh oh, employee not found!", "Error");
        setFormData(null);
        return;
      } else if (response.ok) {
        const data = await response.json();
        console.log(data.employee);
        setFormData({
          fullName: data.employee.personalInformation.fullName || "",
          gender: data.employee.personalInformation.gender || "Male",
          dateOfBirth:
            new Date(data.employee.personalInformation.dateOfBirth)
              .toISOString()
              .split("T")[0] || "",
          email: data.employee.contactInformation.email || "",
          phoneNumber: data.employee.contactInformation.phoneNumber || "",
          jobTitle: data.employee.positionAndDepartment.jobTitle || "",
          department: data.employee.positionAndDepartment.department || "",
          employmentType:
            data.employee.employmentDetails.employmentType || "Full-time",
          joiningDate:
            new Date(data.employee.employmentDetails.joiningDate)
              .toISOString()
              .split("T")[0] || "",
          salaryStructure:
            data.employee.salaryInformation.salaryStructure || "",
          reportingManager:
            data.employee.additionalInformation.reportingManager || "",
          workLocation: data.employee.additionalInformation.workLocation || "",
          employeeID: data.employee.credentials.employeeID || "",
        });
        console.log(formData);
      }
    } catch (err) {
      setError("Failed to fetch employee details");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validateForm(formData);
    setFormErrors(errors);

    let empUpdate = { employeeID };
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      empUpdate = {
        employeeID,
        updatedData: {
          personalInformation: {
            fullName: formData.fullName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
          },
          contactInformation: {
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          },
          positionAndDepartment: {
            jobTitle: formData.jobTitle,
            department: formData.department,
          },
          employmentDetails: {
            employmentType: formData.employmentType,
            joiningDate: formData.joiningDate,
          },
          salaryInformation: {
            salaryStructure: formData.salaryStructure,
          },
          additionalInformation: {
            workLocation: formData.workLocation,
            reportingManager: formData.reportingManager,
          },
        },
      };
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toastr.error("You need to login first!", "Error");
          return;
        }
        const response = await fetch("http://localhost:3000/api/admin/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(empUpdate),
        });
        if (response.ok) {
          toastr.success("Updated employee successfully!", "Success");
          //   handleSearch();
        } else if (!response.ok) {
          toastr.error("Uh oh! Failed to update employee", "Error");
        }
      } catch (err) {
        toastr.error("Uh oh! Problem with internal server", "error");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const validateForm = (data) => {
    const errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = "Full name is required";
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

    if (!data.salaryStructure) {
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
      <>
        <AdminSidebar />
        <MobileAdminSidebar />
      </>
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Employee Management / Update an Employee
        </p>
        <h2 className="text-3xl mt-2 font-medium text-slate-800">
          Update an employee
        </h2>
        <div className="flex flex-col items-center justify-center p-6 mt-8">
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="flex items-center border-b border-coral-green py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none tracking-wider"
                type="text"
                placeholder="Enter Employee ID"
                aria-label="Employee ID"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-coral-green hover:bg-green-700 border-coral-green hover:border-green-700 text-sm border-4 text-white py-1 px-4 rounded-md"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
          {error && <div className="text-red-500 mt-6">{error}</div>}
          {isLoading && (
            <div className="spinner-container flex flex-col items-center mt-44">
              <BeatLoader color="#36D7B7" size={15} margin={5} />
              <p className="mt-4">Loading employee details...</p>
            </div>
          )}
        </div>
        {formData !== null && (
          <form action="" className="mt-8 pb-6" onSubmit={handleSubmit}>
            <div className="border-[1px] border-slate-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="full-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullName"
                      id="full-name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      autoComplete="given-name"
                      className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                      required
                    />
                    {formErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.fullName}
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
              </div>
            </div>
            <div className="min-w-full flex justify-center mt-6 gap-10">
              <button
                className="border-[1px] border-slate-400 px-7 py-2 text-coral-green font-medium rounded-sm hover:rounded-full hover:border-coral-green transition-all duration-300 ease-in-out"
                onClick={() => {
                  setFormData(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-coral-green px-7 py-2 text-white font-medium rounded-sm hover:rounded-full"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateEmployee;
