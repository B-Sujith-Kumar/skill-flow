import AdminSidebar from "./AdminSidebar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import JobCard from "./JobCard";
import { BeatLoader } from "react-spinners";
import search from "../assets/icons/searchIcon.svg";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await fetch("http://localhost:3000/api/admin/displayJobs")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          setIsLoading(false);
        });
    };
    fetchJobs();
    console.log(jobs);
  }, []);
  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-8">
        <div className="flex flex-wrap max-sm:flex-col">
          <div>
            <p className="pt-8 text-slate-500">Pages / Job Management</p>

            <h2 className="text-3xl mt-2 mb-3 font-medium text-slate-800">
              Job Management
            </h2>
          </div>
          <div className="flex flex-1 justify-end items-center mx-7 gap-5 max-sm:justify-start max-sm:mx-0 max-sm:mt-3">
            <NavLink to="/admin/job-management/add-job">
              <div className=" bg-blue-600 text-white p-3 py-1 rounded-md hover:scale-105 transition duration-300 ease-in-out">
                Add Job
              </div>
            </NavLink>

            <NavLink to="/admin/job-management/delete-job">
              <div className=" bg-red-500 text-white mr-10 p-3 py-1 rounded-md hover:scale-105 transition duration-300 ease-in-out">
                Delete Job
              </div>
            </NavLink>
          </div>
        </div>

        <div className=" flex relative mx-20 my-12 text-slate-gray max-xl:mx-0 max-xl:static">
          <div className="flex gap-4 mx-auto bg-white py-4 px-4 rounded-full shadow-xl max-xl:mx-auto max-[920px]:max-w-4xl max-[920px]:mx-0 max-[895px]:mx-auto max-[830px]:mx-0 max-[750px]:flex-wrap max-[750px]:justify-evenly max-[750px]:rounded-lg max-sm:px-4 max-sm:justify-start max-sm:gap-x-6">
            <img src={search} alt="" width={24} />
            <h2 className="sm:hidden font-medium">Search</h2>
            <input
              type="text"
              placeholder="Enter the designation"
              className="lg:flex-1 outline-none text-slate-800 text-lg max-sm:min-w-full border-r-2 border-slate-200 lg:min-w-80"
            />
            <input
              type="text"
              placeholder="Enter job ID"
              className="flex-1 outline-none text-slate-800 text-lg border-r-2 border-slate-200 max-[895px]:max-w-36 max-md:max-w-28 max-[750px]:w-auto max-sm:min-w-full"
            />
            <input
              type="text"
              placeholder="Enter location"
              className="flex-1 outline-none text-slate-800 max-sm:min-w-full text-lg border-slate-400 max-[920px]:max-w-44 max-[830px]:max-w-32 max-sm:border-r-2 max-sm:border-slate-200"
            />
            <button className="bg-blue-600 text-white px-7 py-[7px] rounded-full font-medium active:scale-95 max-[780px]:mr-2 max-sm:mx-auto">
              Search
            </button>
          </div>
        </div>
        <h1 className="text-center mb-8 text-2xl font-semibold">
          Recently added jobs
        </h1>
        {isLoading && (
          <div className="spinner-container flex flex-col items-center mt-44">
            <BeatLoader color="#36D7B7" size={15} margin={5} />
            <p className="mt-4">Loading job details...</p>
          </div>
        )}
        {!isLoading && jobs.length > 0 && (
          <div className="grid grid-cols-3 gap-y-10 gap-8 max-[980px]:items-center max-xl:grid-cols-2 max-sm:grid-cols-1">
            {jobs.map((job) => (
              <JobCard key={job.jobid} job={job} />
            ))}
          </div>
        )}
        {!isLoading && jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-44">
            <p className="text-center text-2xl font-semibold">
              No job postings available
            </p>
          </div>
        )}
        <div className="flex items-center justify-center mt-6">
          <button className="border-2 px-4 py-2 border-blue-600 text-blue-600 flex items-center gap-2 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out rounded-md">
            View More{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={14}
              fill="currentColor"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobManagement;
