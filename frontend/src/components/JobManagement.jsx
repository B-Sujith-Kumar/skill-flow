import AdminSidebar from "./AdminSidebar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import JobCard from "./JobCard";
import { BeatLoader } from "react-spinners";

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
        <p className="pt-8 text-slate-500">Pages / Job Management</p>

        <h2 className="text-3xl mt-2 mb-3 font-medium text-slate-800">
          Job Management
        </h2>

        <div className=" flex flex-1 justify-end items-center mx-7 gap-5">
          <NavLink to="/admin/job-management/add-job">
            <div className=" bg-blue-500 text-white p-3 rounded-full hover:scale-105 transition duration-300 ease-in-out">
              Add Job
            </div>
          </NavLink>

          <NavLink to="/admin/job-management/delete-job">
            <div className=" bg-red-500 text-white mr-10 p-3 rounded-full hover:scale-105 transition duration-300 ease-in-out">
              Delete Job
            </div>
          </NavLink>
        </div>
        <div className=" flex relative mx-20 my-12 text-slate-gray">
          <input
            className="flex-1 justify-center items-center border-2 border-slate-gray-300 bg-white  h-12 px-6 rounded-full text-md focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
        </div>
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
      </div>
    </div>
  );
};

export default JobManagement;
