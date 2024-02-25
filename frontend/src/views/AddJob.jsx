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

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobid: "",
    department: "",
    location: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    education: "",
    experience: "",
    skill: "",
    skills: [],
    employmentType: "Full-time",
    applicationDeadline: "",
    salary: "",
    contactEmail: "",
    reportingManager: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSkillInputChange = (e) => {
    setFormData({ ...formData, skill: e.target.value });
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const addField = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    });
    console.log(formData.responsibilities);
  };

  const deleteResponsibilty = (index) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities.splice(index, 1);
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addReqField = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    });
    console.log(formData.requirements);
  };

  const deleteRequirement = (index) => {
    const newRequirements = [...formData.requirements];
    newRequirements.splice(index, 1);
    setFormData({ ...formData, requirements: newRequirements });
  };

  const handleSkillAdd = () => {
    if (formData.skill === "") return;
    setFormData((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, formData.skill],
      skill: "",
    }));
    console.log(formData.skills);
  };

  const handleSkillDelete = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted");
      console.log(JSON.stringify(formData));
      try {
        const response = await fetch("http://localhost:3000/api/admin/addJob", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (
          !response.ok ||
          response.status === 400 ||
          response.message === "Duplicate Job ID"
        ) {
          toastr.error("Uh oh! Duplicate Job ID found", "Error");
        } else if (response.ok) {
          toastr.success("Job created successfully!", "Success");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.title.trim()) {
      errors.title = "Title is required";
    }

    if (!data.jobid) {
      errors.jobid = "Job ID is required";
    }

    if (!data.department.trim()) {
      errors.department = "Department is required";
    }

    if (!data.location.trim()) {
      errors.location = "Location is required";
    }

    if (!data.description.trim()) {
      errors.description = "Description is required";
    }

    if (
      data.responsibilities.some((responsibility) => !responsibility.trim())
    ) {
      errors.responsibilities = "All responsibilities must be filled";
    }

    if (data.requirements.some((requirement) => !requirement.trim())) {
      errors.requirements = "All requirements must be filled";
    }

    if (!data.education.trim()) {
      errors.education = "Education is required";
    }

    if (!data.experience.trim()) {
      errors.experience = "Experience is required";
    }

    if (data.skills.length === 0) {
      errors.skills = "At least one skill is required";
    }

    if (!data.employmentType) {
      errors.employmentType = "Employment Type is required";
    }

    if (!data.applicationDeadline) {
      errors.applicationDeadline = "Application Deadline is required";
    }

    if (!data.salary) {
      errors.salary = "Salary is required";
    }

    if (!data.contactEmail.trim()) {
      errors.contactEmail = "Contact Email is required";
    }

    if (!data.reportingManager.trim()) {
      errors.reportingManager = "Reporting Manager is required";
    }

    setErrors(errors);
    return errors;
  };

  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Job Management / Add Job
        </p>
        <h2 className="text-3xl mt-2 mb-4 font-medium text-slate-800">
          Add Job
        </h2>
        <form onSubmit={onSubmit}>
          <div className="border-[1px] border-slate-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Job Details
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    autoComplete="given-title"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2">{errors.title}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="jobid"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Job ID <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="jobid"
                    id="jobid"
                    value={formData.jobid}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.jobid && (
                    <p className="text-red-500 text-sm mt-2">{errors.jobid}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="department"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.department}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="education"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Education: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.education && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.education}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="responsibilities"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Responsibilities: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  {formData.responsibilities.map((responsibility, index) => (
                    <div
                      className="flex justify-center items-center mt-4 gap-4"
                      key={index}
                    >
                      <input
                        type="text"
                        value={responsibility}
                        id="responsibilities"
                        onChange={(e) =>
                          handleResponsibilityChange(index, e.target.value)
                        }
                        className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                        required
                      />
                      {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={20}
                          className="text-coral-green cursor-pointer"
                          onClick={() => deleteResponsibilty(index)}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                        </svg>
                      }
                    </div>
                  ))}
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={addField}
                      className="bg-coral-green text-white px-4 py-2 rounded mt-4 text-sm"
                    >
                      Add Responsibility
                    </button>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="requirements"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Requirements: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  {formData.requirements.map((requirement, index) => (
                    <div
                      className="flex justify-center items-center mt-4 gap-4"
                      key={index}
                    >
                      <input
                        type="text"
                        value={requirement}
                        id="requirements"
                        onChange={(e) =>
                          handleRequirementChange(index, e.target.value)
                        }
                        className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                        required
                      />
                      {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={20}
                          className="text-coral-green cursor-pointer"
                          onClick={() => deleteRequirement(index)}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                        </svg>
                      }
                    </div>
                  ))}
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={addReqField}
                      className="bg-coral-green text-white px-4 py-2 rounded mt-4 text-sm"
                    >
                      Add Requirement
                    </button>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Description:
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="experience"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Experience: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    required
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.experience}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="skills"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Skills: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    id="skill"
                    name="skill"
                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                    value={formData.skill}
                    onChange={handleSkillInputChange}
                  />
                  <button
                    type="button"
                    className="text-white bg-coral-green px-3 rounded-md text-sm"
                    onClick={handleSkillAdd}
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-y-2">
                  {formData.skills &&
                    formData.skills.map((s, index) => (
                      <p
                        key={index}
                        className="bg-slate-200 px-3 py-2 mr-2 rounded-full text-sm text-slate-800 flex
                        gap-2"
                      >
                        {s}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={14}
                          className="text-coral-green cursor-pointer"
                          onClick={() => handleSkillDelete(index)}
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                        </svg>
                      </p>
                    ))}
                </div>
                {errors.skills && (
                  <p className="text-red-500 text-sm">{errors.skills}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="employmentType"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Employment Type: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="employmentType"
                    name="employmentType"
                    autoComplete="gender-type"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
                {errors.employmentType && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.employmentType}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="applicationDeadline"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Application Deadline: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="applicationDeadline"
                    id="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                  {errors.applicationDeadline && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.applicationDeadline}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="salary"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Salary: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-2">{errors.salary}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="contactEmail"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Contact Email: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="contactEmail"
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="reportingManager"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Reporting Manager: <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="reportingManager"
                    id="reportingManager"
                    value={formData.reportingManager}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
                    required
                  />
                  {errors.reportingManager && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.reportingManager}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-full flex justify-center mt-6 py-5 gap-10">
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

export default AddJob;
