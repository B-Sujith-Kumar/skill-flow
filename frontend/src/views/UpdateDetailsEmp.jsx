import { useState, useEffect } from "react";
import toastr from "toastr";
import { BeatLoader } from "react-spinners";
import logo from "../assets/images/logo.svg";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useNavigate } from "react-router-dom";

const UpdateDetailsEmp = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [resume, setResume] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);
  const nav = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    if (file) {
      setResume(file);
    }
  };

  const uploadResume = () => {
    setLoadingResume(true);
    if (resume) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`Resume/${resume.name}`);
      fileRef.put(resume).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData((prevData) => ({
            ...prevData,
            resumeFile: downloadURL,
          }));
          toastr.success("Resume uploaded successfully", "Success");
          setLoadingResume(false);
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const finalForm = {
        ...formData,
        socialProfileLinks: [
          formData.facebook,
          formData.quora,
          formData.twitter,
          formData.github,
          formData.linkedin,
        ],
      };
      console.log(finalForm);
      try {
        const res = await fetch(
          "http://localhost:3000/api/employee/update-employee",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              employeeID: localStorage.getItem("ID"),
              finalForm,
            }),
          }
        );

        if (res.ok) {
          toastr.success("Profile updated successfully", "Success");
          console.log("Profile updated successfully");
          nav("/user/dashboard");
        } else {
          toastr.error("Failed to update profile", "Error");
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Errors found");
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

    if (
      data.facebook &&
      !/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+(\/)?$/.test(
        data.facebook
      )
    ) {
      errors.facebook = "Invalid Facebook URL";
    }

    if (
      data.quora &&
      !/^(https?:\/\/)?(www\.)?quora\.com\/[^/]+$/.test(data.quora)
    ) {
      errors.quora = "Invalid Quora URL";
    }

    if (
      data.linkedin &&
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[^/]+\/?$/.test(
        data.linkedin
      )
    ) {
      errors.linkedin = "Invalid LinkedIn URL";
    }

    if (
      data.twitter &&
      !/^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/i.test(data.twitter)
    ) {
      errors.twitter = "Invalid Twitter URL";
    }

    if (
      data.github &&
      !/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/)?$/.test(
        data.github
      )
    ) {
      errors.github = "Invalid Github URL";
    }

    return errors;
  };

  const handleSkillDelete = (index) => {
    console.log("Entered here");
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      newSkills.splice(index, 1);
      return newSkills;
    });
    setFormData((prevData) => {
      const newSkills = [...prevData.skills];
      newSkills.splice(index, 1);
      return {
        ...prevData,
        skills: newSkills,
      };
    });
  };

  const handleSkillAdd = () => {
    if (!newSkill.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        skills: "Skill is required",
      }));
      return;
    }
    setSkills((prevSkills) => [...prevSkills, newSkill]);
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, newSkill],
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      skills: "",
    }));
    setNewSkill("");
  };

  const uploadImage = async () => {
    // try {
    //   const res = await fetch(
    //     "http://localhost:3000/api/employee/update-profile-img",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         employeeID: localStorage.getItem("ID"),
    //         image: imageData,
    //       }),
    //     }
    //   );
    //   if (res.ok) {
    //     toastr.success("Profile image updated successfully", "Success");
    //     console.log("Profile image updated successfully");
    //     window.location.reload();
    //   } else {
    //     toastr.error("Failed to update profile image", "Error");
    //     console.error("Failed to update profile image");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    if (img) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`ProfileImages/${img.name}`);
      fileRef.put(img).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData((prevData) => ({
            ...prevData,
            profileImage: downloadURL,
          }));
          toastr.success("Image uploaded successfully", "Success");
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const employeeID = localStorage.getItem("ID");
      try {
        const response = await fetch(
          `http://localhost:3000/api/employee/get-employee/${employeeID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
            workLocation:
              data.employee.additionalInformation.workLocation || "",
            employeeID: data.employee.credentials.employeeID || "",
            facebook:
              data.employee.additionalInformation.socialProfileLinks[0] || "",
            github:
              data.employee.additionalInformation.socialProfileLinks[3] || "",
            linkedin:
              data.employee.additionalInformation.socialProfileLinks[4] || "",
            quora:
              data.employee.additionalInformation.socialProfileLinks[1] || "",
            twitter:
              data.employee.additionalInformation.socialProfileLinks[2] || "",
            profileImage: data.employee.additionalInformation.profileImage,
            skills:
              data.employee.additionalInformation.skills.length !== 0
                ? data.employee.additionalInformation.skills
                : [],
            resumeFile: data.employee.additionalInformation.resumeFile,
          });
        }
      } catch (err) {
        setError("Failed to fetch employee details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails().then((res) => setIsLoading(false));
  }, []);

  return (
    <div className="bg-dashboard">
      <header className=" py-3 text-center font-rubik text-3xl font-medium">
        <img src={logo} alt="" className="mx-auto" />
      </header>
      {!isLoading ? (
        <div className="font-rubik">
          <h2 className="text-center text-2xl font-semibold mt-4">
            Complete your profile
          </h2>
          <div className="flex w-full gap-8 mt-4 px-6 max-md:flex-col">
            <div className="">
              <div className="px-8 py-6 border-[3px] border-yellow-300 shadow-lg rounded-sm bg-white">
                <img
                  src={previewImg || formData.profileImage}
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
                {!previewImg && (
                  <div className="flex items-center justify-center mt-8 gap-2 bg-blue-800 px-2 py-2 rounded-sm text-white max-md:w-48 max-md:mx-auto">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium shadow-sm"
                    >
                      <span>Upload image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                          setPreviewImg(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      width={25}
                      fill="currentColor"
                    >
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                    </svg>
                  </div>
                )}
                {previewImg && (
                  <div className="flex gap-5 items-center justify-center mt-6">
                    <button
                      className="bg-blue-700 border-2 border-blue-700 px-5 py-1 text-white rounded-sm"
                      onClick={uploadImage}
                    >
                      Submit
                    </button>
                    <button
                      className="border-2 border-blue-700 px-5 py-1"
                      onClick={() => {
                        setPreviewImg(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              {formData && (
                <form action="" className="pb-6" onSubmit={handleSubmit}>
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

                  {formData.resumeFile ? (
                    <div className="border-[2.5px] border-yellow-300 pb-6 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Resume Upload
                      </h2>
                      {/* <p className="mt-6">{formData.resumeFile}</p> */}
                      <div className="mt-4 flex gap-2 text-blue-800">
                        <a
                          href={formData.resumeFile}
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
                  ) : !resume ? (
                    <div className="border-[2.5px] border-yellow-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Resume Upload
                      </h2>
                      <div
                        className="flex items-center justify-center w-full mt-8"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Accepted Format: PDF
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => setResume(e.target.files[0])}
                          />
                        </label>
                      </div>
                    </div>
                  ) : !loadingResume ? (
                    <div className="border-[2.5px] border-yellow-300 pb-4 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Resume Upload
                      </h2>
                      <p className="mt-6">{resume.name}</p>
                      <div className="flex gap-4 mt-8">
                        <button
                          className="bg-blue-700 px-5 py-2 text-white rounded-md border-2 border-blue-700"
                          type="button"
                          onClick={uploadResume}
                        >
                          Upload Resume
                        </button>
                        <button
                          className="bg-white px-5 py-2 text-black rounded-md border-2 border-blue-700"
                          onClick={() => {
                            setResume(null);
                            setFormData({ ...formData, resumeFile: "" });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-[2.5px] border-yellow-300 pb-4 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Resume Upload
                      </h2>
                      <div className="flex flex-col items-center justify-center w-full mt-8">
                        <BeatLoader color="#000" />
                        <p className="mt-4">Uploading Resume...</p>
                      </div>
                    </div>
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
                            value={formData.facebook}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                          />
                          {formErrors.facebook && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.facebook}
                            </p>
                          )}
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
                            value={formData.twitter}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                          />
                          {formErrors.twitter && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.twitter}
                            </p>
                          )}
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
                            value={formData.quora}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                          />
                          {formErrors.quora && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.quora}
                            </p>
                          )}
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
                            value={formData.github}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                          />
                          {formErrors.github && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.github}
                            </p>
                          )}
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
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            autoComplete="given-name"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                          />
                          {formErrors.linkedin && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.linkedin}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-[2.5px] border-yellow-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white mt-8">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">
                      Skills
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-sm:gap-y-0">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="skills"
                          className="block text-md font-medium leading-6 text-gray-900"
                        >
                          Enter a skill below{" "}
                          <span className="text-red-500"></span>
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="skills"
                            id="skills"
                            value={newSkill}
                            autoComplete="given-name"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
                            onChange={(e) => setNewSkill(e.target.value)}
                          />
                          {formErrors.skills && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.skills}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-1 my-auto mt-9">
                        <button
                          type="button"
                          className="bg-blue-700 text-white px-4 py-1 rounded-md"
                          onClick={handleSkillAdd}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {formData.skills.length !== 0 && (
                      <div className="mt-6 flex flex-wrap gap-y-2">
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
                            value={formData.jobTitle}
                            onChange={handleInputChange}
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
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                            required
                            disabled={true}
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                            required
                            disabled={true}
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
                          Salary structure{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                          <input
                            id="salary"
                            name="salaryStructure"
                            type="number"
                            value={formData.salaryStructure}
                            onChange={handleInputChange}
                            autoComplete="salary"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                            required
                            disabled={true}
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
                          Reporting Manager{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                          <input
                            id="reporting-manager"
                            name="reportingManager"
                            type="text"
                            value={formData.reportingManager}
                            onChange={handleInputChange}
                            autoComplete="reporting-manager"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                            required
                            disabled={true}
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
                        {formErrors.workLocation && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.workLocation}
                          </p>
                        )}
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
                            value={formData.employeeID}
                            onChange={handleInputChange}
                            autoComplete="employee-id"
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide cursor-not-allowed"
                            disabled={true}
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
                      type="submit"
                      className="bg-blue-800 px-7 py-2 text-white font-medium rounded-sm hover:rounded-full"
                    >
                      Update
                    </button>
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
  );
};

export default UpdateDetailsEmp;
