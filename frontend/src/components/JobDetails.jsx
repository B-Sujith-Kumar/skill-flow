import companyLogo from "../assets/images/78730.gif";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const JobDetails = ({ jobDetails, isIndividual }) => {
  const [applied, setApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState([]);
  const [currentJob, setCurrentJob] = useState(jobDetails);
  const [applicants, setApplicants] = useState(0);
  const [employeeSkills, setEmployeeSkills] = useState([]);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  console.log(applied);
  const handleJobApply = () => {
    const applyJob = async () => {
      const res = await fetch("http://localhost:3000/api/employee/apply-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: jobDetails.jobid,
          employeeId: localStorage.getItem("ID"),
        }),
      });
      if (res.status === 200) {
        setApplicants(applicants + 1);
        toastr.success("Applied for job successfully", "Success");
        setApplied(true);
      } else {
        toastr.error("Failed to apply for job", "Error");
      }
    };
    applyJob();
  };
  useEffect(() => {
    setIsLoading(true);
    const checkApplied = async () => {
      const job = await fetch(
        "http://localhost:3000/api/admin/searchJob/" + jobDetails.jobid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jobData = await job.json();
      const appliedEmployees = jobData.applicants;
      const employeeId = localStorage.getItem("ID");
      setApplicants(jobData.applicants.length);
      if (appliedEmployees.includes(employeeId)) {
        setApplied(true);
      } else {
        setApplied(false);
      }
    };
    checkApplied().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const fetchEmployeeSkills = async () => {
      try {
        const employeeId = localStorage.getItem("ID");
        const response = await fetch(
          `http://localhost:3000/api/employee/get-employee/${employeeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee skills");
        }
        const data = await response.json();
        if (
          data &&
          data.employee.additionalInformation &&
          data.employee.additionalInformation.skills
        ) {
          setEmployeeSkills(data.employee.additionalInformation.skills);
          setIsLoading(false);
          console.log(data.employee.additionalInformation.skills);
        } else {
          throw new Error("Employee skills not found in response data");
        }
      } catch (error) {
        console.error("Error fetching employee skills:", error);
        setIsLoading(false);
      }
    };

    fetchEmployeeSkills();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/allJobs");
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <div className="mb-8 w-2/3">
        <div
          className={`font-rubik bg-white px-6 py-4 rounded-3xl  ${
            isIndividual ? "max-w-2xl" : "max-w-4xl mx-auto"
          } shadow-lg`}
        >
          <div className="border-b-[1.5px] flex justify-between items-center mt-3 pb-5">
            <div className="">
              <h2 className="text-xl font-medium text-slate-800">
                {jobDetails.title}
              </h2>
              <div>
                <div className="flex gap-10 mt-5 items-center">
                  <div className="flex gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={12}
                      fill="#717b9e"
                    >
                      <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                    </svg>
                    <span className="text-slate-600 text-sm">
                      {jobDetails.experience}
                    </span>
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width={10}
                        fill="#717b9e"
                      >
                        <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
                      </svg>
                      <span className="text-slate-600 text-sm">
                        Upto {jobDetails.salary} LPA
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width={14}
                    fill="#717b9e"
                  >
                    <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                  </svg>
                  <span className="text-slate-600 text-sm line-clamp-1">
                    {jobDetails.location}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <img src={companyLogo} alt="" width={110} className="mr-10" />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex gap-x-4 flex-wrap">
              <p className="mt-4 text-sm inline-block border-r-[1.5px] border-r-slate-200 pr-3">
                <span className="text-slate-600">Posted:</span>{" "}
                <span className="text-slate-800">
                  {Math.round(
                    Math.abs(
                      (new Date() - new Date(jobDetails.publishedAt)) /
                        (1000 * 60 * 60 * 24)
                    )
                  )}{" "}
                  days ago
                </span>
              </p>
              <p className="mt-4 text-sm inline-block border-r-[1.5px] border-r-slate-200 pr-3">
                <span className="text-slate-600">Openings:</span>{" "}
                <span className="text-slate-800">
                  {jobDetails.openings ? jobDetails.openings : "Not disclosed"}
                </span>
              </p>
              <p className="mt-4 text-sm inline-block">
                <span className="text-slate-600">Applicants:</span>{" "}
                <span className="text-slate-800">
                  {applicants ? applicants : "0"}
                </span>
              </p>
            </div>
            {localStorage.getItem("Type") === "employee" && (
              <div>
                <button
                  className={`${
                    applied ? "bg-green-600" : "bg-blue-600 active:bg-blue-800"
                  } text-white text-sm px-4 py-2  active:scale-95 rounded-full mt-4`}
                  onClick={handleJobApply}
                  disabled={applied}
                >
                  {applied ? "Applied" : "Apply Now"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className={`font-rubik bg-white px-6 py-4 rounded-3xl ${
            isIndividual ? "max-w-2xl" : "max-w-4xl mx-auto"
          } mt-8 shadow-lg`}
        >
          <p className="text-md font-medium">Job Description</p>
          <p className="mt-6 text-[15px]">
            <span className="text-slate-800 font-medium">Project Role : </span>
            <span className="text-slate-600">{jobDetails.title}</span>
          </p>
          <p className="text-[15px] mt-4 text-slate-800 font-medium">
            Project Role Description:{" "}
          </p>
          <p className="text-[15px] mt-3 text-slate-600">
            {jobDetails.description}
          </p>
          <p className="mt-6 text-[15px]">
            <span className="text-slate-800 font-medium">
              Educational Qualifications :{" "}
            </span>
            <span className="text-slate-600">{jobDetails.education}</span>
          </p>
          <p className="text-[15px] mt-4 text-slate-800 font-medium">
            Requirements:{" "}
          </p>
          {jobDetails.requirements.map((requirement, index) => (
            <div key={index} className="flex mt-3">
              <li key={index} className="text-[15px] pl-4"></li>
              <span className="text-slate-600 text-[15px]">{requirement}</span>
            </div>
          ))}
          <p className="text-[15px] mt-4 text-slate-800 font-medium">
            Responsibilities:{" "}
          </p>
          {jobDetails.responsibilities.map((requirement, index) => (
            <div key={index} className="flex mt-3">
              <li key={index} className="text-[15px] pl-4"></li>
              <span className="text-slate-600 text-[15px]">{requirement}</span>
            </div>
          ))}
          <p className="text-[15px] mt-4 text-slate-800 font-medium">
            Key Skills:{" "}
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            {jobDetails.skills.map((skill, index) => (
              <span
                key={index}
                className="text-slate-800 text-[14px] border-[1.5px] px-3 py-1 rounded-full hover:text-blue-500
              hover:border-blue-500 transition duration-300 ease-in-out text-center border-slate-400 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[15px]">
            <span className="text-slate-800 font-medium">Department : </span>
            <span className="text-slate-600">{jobDetails.department}</span>
          </p>
          <p className="mt-6 text-[15px]">
            <span className="text-slate-800 font-medium">
              Employment Type :{" "}
            </span>
            <span className="text-slate-600">{jobDetails.employmentType}</span>
          </p>
          <p className="mt-6 text-[15px]">
            <span className="text-slate-800 font-medium">
              Reporting Manager :{" "}
            </span>
            <span className="text-slate-600">
              {jobDetails.reportingManager}
            </span>
          </p>
          <p className="mt-6 text-[15px] border-b-2 pb-4">
            <span className="text-slate-800 font-medium">Contact Email : </span>
            <span className="text-slate-600">{jobDetails.contactEmail}</span>
          </p>
          <p className="mt-4 pb-2">
            <span className="text-slate-600 font-medium">
              Application Deadline:
            </span>{" "}
            <span className="text-slate-700">
              {new Date(jobDetails.applicationDeadline).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>
          </p>
        </div>
      </div>
      {!isSmallScreen && (
        <div className="w-1/3 ">
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border shadow-lg bg-white px-6 py-4">
              <h2 className="text-xl font-medium text-slate-800">
                Your Skills
              </h2>
              <div className="flex gap-4 mt-4 flex-wrap">
                {employeeSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-slate-800 text-[14px] border-[1.5px] px-3 py-1 rounded-full hover:text-blue-500
              hover:border-blue-500 transition duration-300 ease-in-out text-center border-slate-400 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border shadow-lg bg-white px-6 py-4">
              <h2 className="text-xl font-medium text-slate-800 mb-2">
                More Jobs
              </h2>
              {shuffleArray(job.filter((job) => job.jobid !== currentJob.jobid))
                .slice(0, 4)
                .map((jobItem, index) => (
                  <a
                    key={index}
                    href={`/admin/job-management/view-job/${jobItem.jobid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      key={index}
                      className="max-w-lg bg-white pt-4 px-3 border-[1.5px] rounded-xl pb-4 hover:shadow-xl cursor-pointer transition duration-300 ease-in-out h-full my-4"
                    >
                      <h2 className="text-md font-medium mt-2 text-slate-800">
                        {jobItem.title}
                      </h2>
                      <div className="flex gap-5">
                        <div className="flex gap-2 mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={14}
                            fill="#717b9e"
                          >
                            <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                          </svg>
                          <span className="text-slate-600 text-sm">
                            {jobItem.experience}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            width={10}
                            fill="#717b9e"
                          >
                            <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
                          </svg>
                          <span className="text-slate-600 text-sm">
                            Upto {jobItem.salary} LPA
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center mt-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          width={16}
                          fill="#717b9e"
                        >
                          <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                        </svg>
                        <span className="truncate w-full max-w-xs text-slate-600 text-sm tracking-wide">
                          {jobItem.location}
                        </span>
                      </div>
                      <div className="flex gap-4 mt-4 flex-wrap">
                        {jobItem.skills.map(
                          (skill, index) =>
                            index < 3 && (
                              <span
                                key={index}
                                className="text-slate-800 text-[14px] border-[1.5px] px-3 py-1 rounded-full hover:text-blue-500hover:border-blue-500 transition duration-300 ease-in-out text-center border-slate-400 cursor-default"
                              >
                                {skill}
                              </span>
                            )
                        )}
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
