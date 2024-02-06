import AdminSidebar from "../components/AdminSidebar";
import "../App.css";

const AddEmployee = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen pb-4 main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Employee Management / Add an Employee
        </p>
        <h2 className="text-3xl mt-2 font-medium text-slate-800 text-green-600">
          Add an employee
        </h2>
        <form action="" className="my-8">
          <div className="border-[1px] border-slate-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
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
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="phnumber"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phnumber"
                    name="phnumber"
                    type="text"
                    autoComplete="phnumber"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
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
                  Job title
                </label>
                <div className="mt-2">
                  <select
                    id="jobtitle"
                    name="jobtitle"
                    autoComplete="job-title"
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <optgroup label="JL 7" className="font-bold">
                      <option value="">JL 7A</option>
                      <option value="">JL 7B</option>
                    </optgroup>
                    <optgroup label="JL 6" className="font-bold">
                      <option value="">JL 6A</option>
                      <option value="">JL 6B</option>
                    </optgroup>
                    <optgroup label="JL 5" className="font-bold">
                      <option value="">JL 5A</option>
                      <option value="">JL 5B</option>
                    </optgroup>
                    <optgroup label="JL 4" className="font-bold">
                      <option value="">JL 4A</option>
                      <option value="">JL 4B</option>
                    </optgroup>
                    <optgroup label="JL 3" className="font-bold">
                      <option value="">JL 3A</option>
                      <option value="">JL 3B</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="department"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Department
                </label>
                <div className="mt-2">
                  <input
                    id="department"
                    name="department"
                    type="text"
                    autoComplete="department"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="emp-type"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Employee type
                </label>
                <div className="mt-2">
                  <select
                    id="emp-type"
                    name="emp-type"
                    autoComplete="emp-type"
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option>Full time</option>
                    <option>Part time</option>
                    <option>Temporary</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="date-of-joining"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Joining Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="date-of-joining"
                    id="date-of-joining"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="salary"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Salary structure
                </label>
                <div className="mt-2">
                  <input
                    id="salary"
                    name="salary"
                    type="number"
                    autoComplete="salary"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="reporting-manager"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Reporting Manager
                </label>
                <div className="mt-2">
                  <input
                    id="reporting-manager"
                    name="reporting-manager"
                    type="text"
                    autoComplete="reporting-manager"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="work-location"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Work location
                </label>
                <div className="mt-2">
                  <select
                    id="work-location"
                    name="work-location"
                    autoComplete="work-location"
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option>Hyderabad</option>
                    <option>Bengaluru</option>
                    <option>Chennai</option>
                    <option>Mumbai</option>
                  </select>
                </div>
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
                  Employee ID
                </label>
                <div className="mt-2">
                  <input
                    id="employee-id"
                    name="employee-id"
                    type="text"
                    autoComplete="employee-id"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                  />
                </div>
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
