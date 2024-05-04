import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import logo from "../assets/images/logo.svg";
import "firebase/compat/storage";
import { useParams } from "react-router-dom";

const ApplicantDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchEmployee = async () => {
      const res = await fetch(
        "http://localhost:3000/api/employee/get-employee/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setEmployee(data.employee);
      console.log(data);
      setIsLoading(false);
    };
    fetchEmployee();
  }, []);

  return (
    employee && (
      <div className="bg-dashboard">
        <header className=" py-3 text-center font-rubik text-3xl font-medium">
          <img src={logo} alt="" className="mx-auto" />
        </header>
        {!isLoading ? (
          <div className="font-rubik">
            <div className="flex w-full gap-8 mt-4 px-6 max-md:flex-col">
              <div>
                <div className="">
                  <div className="px-8 py-6 border-[3px] border-yellow-300 shadow-lg rounded-sm bg-white">
                    <img
                      src={employee.additionalInformation.profileImage}
                      alt=""
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                </div>
                <div className="text-center mt-6 border-[3px] rounded-sm font-medium border-yellow-300 bg-white py-2 tracking-wide">
                  Employee ID : {employee.credentials.employeeID}
                </div>
              </div>
              <div className="flex-1">
                {employee && (
                  <form action="" className="pb-6">
                    <div className="border-[2.5px] border-yellow-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white">
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
                              value={employee.personalInformation.fullName}
                              autoComplete="given-name"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                              required
                              disabled={true}
                            />
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
                            <input
                              id="gender"
                              name="gender"
                              value={employee.personalInformation.gender}
                              autoComplete="gender-type"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide cursor-not-allowed"
                              disabled={true}
                            ></input>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="dob"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Date of Birth{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <input
                              name="dateOfBirth"
                              id="dob"
                              value={employee.personalInformation.dateOfBirth.slice(
                                0,
                                10
                              )}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Email address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={employee.contactInformation.email}
                              disabled={true}
                              autoComplete="email"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                              required
                            />
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
                              value={employee.contactInformation.phoneNumber}
                              autoComplete="phnumber"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                              required
                              minLength={10}
                              maxLength={10}
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {employee.additionalInformation.resumeFile ? (
                      <div className="border-[2.5px] border-yellow-300 pb-6 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">
                          Resume Upload
                        </h2>
                        {/* <p className="mt-6">{formData.resumeFile}</p> */}
                        <div className="mt-4 flex gap-2 text-blue-800">
                          <a
                            href={employee.additionalInformation.resumeFile}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-800"
                          >
                            Click here to view resume
                          </a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width={15}
                            fill="currentColor"
                          >
                            <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="border-[2.5px] border-yellow-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Social Profiles
                      </h2>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="facebook"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Facebook <span className="text-red-500"></span>
                          </label>
                          <div className="mt-2">
                            <input
                              type="url"
                              name="facebook"
                              id="facebook"
                              value={
                                employee.additionalInformation
                                  .socialProfileLinks[0]
                              }
                              autoComplete="given-name"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                              disabled={true}
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="twitter"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Twitter <span className="text-red-500"></span>
                          </label>
                          <div className="mt-2">
                            <input
                              type="url"
                              name="twitter"
                              id="twitter"
                              value={
                                employee.additionalInformation
                                  .socialProfileLinks[1]
                              }
                              autoComplete="given-name"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="quora"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Quora <span className="text-red-500"></span>
                          </label>
                          <div className="mt-2">
                            <input
                              type="url"
                              name="quora"
                              id="quora"
                              value={
                                employee.additionalInformation
                                  .socialProfileLinks[2]
                              }
                              autoComplete="given-name"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                              disabled={true}
                            />
                          </div>
                        </div>
                        <h2 className="text-xl font-semibold leading-7 text-gray-900 col-span-full">
                          Professional Profiles
                        </h2>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="github"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Github <span className="text-red-500"></span>
                          </label>
                          <div className="mt-2">
                            <input
                              type="url"
                              name="github"
                              id="github"
                              value={
                                employee.additionalInformation
                                  .socialProfileLinks[3]
                              }
                              autoComplete="given-name"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="linkedin"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            LinkedIn <span className="text-red-500"></span>
                          </label>
                          <div className="mt-2">
                            <input
                              type="url"
                              name="linkedin"
                              id="linkedin"
                              value={
                                employee.additionalInformation
                                  .socialProfileLinks[4]
                              }
                              autoComplete="given-name"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                              disabled={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[2.5px] border-yellow-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Skills
                      </h2>

                      {employee.additionalInformation.skills.length !== 0 && (
                        <div className="mt-6 flex flex-wrap gap-y-2">
                          {employee.additionalInformation.skills &&
                            employee.additionalInformation.skills.map(
                              (s, index) => (
                                <p
                                  key={index}
                                  className="bg-slate-200 px-3 py-2 mr-2 rounded-full text-sm text-slate-800 flex
                        gap-2"
                                >
                                  {s}
                                </p>
                              )
                            )}
                        </div>
                      )}
                    </div>
                    <div className="border-[2.5px] border-yellow-300 pb-12 bg-white px-7 pt-4 mt-8 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')]">
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
                              value={employee.positionAndDepartment.jobTitle}
                              className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide cursor-not-allowed"
                              disabled={true}
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
                              value={employee.positionAndDepartment.department}
                              autoComplete="department"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="emp-type"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Employee type{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="emp-type"
                              name="employmentType"
                              autoComplete="emp-type"
                              value={employee.employmentDetails.employmentType}
                              className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide cursor-not-allowed"
                              disabled={true}
                            >
                              <option value="">Select</option>
                              <option value="Full-time">Full time</option>
                              <option value="Part-time">Part time</option>
                              <option value="Temporary">Temporary</option>
                              <option value="Contract">Contract</option>
                            </select>
                          </div>
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
                              value={employee.employmentDetails.joiningDate}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="salary"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Salary structure{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <input
                              id="salary"
                              name="salaryStructure"
                              type="number"
                              value={employee.salaryInformation.salaryStructure}
                              autoComplete="salary"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="reporting-manager"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Reporting Manager{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <input
                              id="reporting-manager"
                              name="reportingManager"
                              type="text"
                              value={
                                employee.additionalInformation.reportingManager
                              }
                              autoComplete="reporting-manager"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                              required
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="work-location"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Work location{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="work-location"
                              name="workLocation"
                              value={
                                employee.additionalInformation.workLocation
                              }
                              autoComplete="work-location"
                              className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide cursor-not-allowed"
                              disabled={true}
                            >
                              <option value="">Select</option>
                              <option value="Hyderabad">Hyderabad</option>
                              <option value="Bengaluru">Bengaluru</option>
                              <option value="Chennai">Chennai</option>
                              <option value="Mumbai">Mumbai</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-[2.5px] border-yellow-300 pb-12 bg-white px-7 pt-4 mt-8 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')]">
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
                              value={employee.credentials.employeeID}
                              autoComplete="employee-id"
                              className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                              disabled={true}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen min-w-72 items-center justify-center flex flex-1">
            <div className="min-w-full text-center">
              <BeatLoader color="#36D7B7" margin={3} />
              <p className="font-rubik text-md mt-2">Loading...</p>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ApplicantDetails;
