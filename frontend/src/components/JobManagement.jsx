import AdminSidebar from "./AdminSidebar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import JobCard from "./JobCard";
import { BeatLoader } from "react-spinners";
import search from "../assets/icons/searchIcon.svg";
import { Link } from "react-router-dom";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState("");
  const [jobID, setJobID] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await fetch("http://localhost:3000/api/admin/displayJobs")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
        });
      await fetch("http://localhost:3000/api/admin/allJobs")
        .then((res) => res.json())
        .then((data) => {
          setAllJobs(data);
          setIsLoading(false);
        });
    };
    fetchJobs();
  }, []);
  const postChange = (e) => {
    setPost(e.target.value);
  };
  const jobChange = (e) => {
    setJobID(e.target.value);
  };
  const locationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleSearch = async () => {
    setSearched(true);

    if (post === "" && jobID === "" && location === "") {
      setSearched(false);
      return;
    } else {
      let filtered = [];
      if (jobID !== "") {
        const jobid = Number.parseInt(jobID);
        filtered = allJobs.filter((job) => job.jobid === jobid);
      } else {
        const jobSet = new Set();
        if (post !== "") {
          allJobs.forEach((job) => {
            if (job.title.toLowerCase().includes(post.toLowerCase())) {
              filtered.push(job);
              jobSet.add(job.jobid);
            }
          });
        }
        if (location !== "") {
          allJobs.forEach((job) => {
            if (
              job.location.toLowerCase().includes(location.toLowerCase()) &&
              !jobSet.has(job.jobid)
            ) {
              filtered.push(job);
              jobSet.add(job.jobid);
            }
          });
        }
      }

      if (filtered.length === 0) {
        setError("No jobs found with the given filters.");
      } else {
        setError("");
      }
      setFilteredJobs(filtered);
    }
  };

  const cancelFilters = () => {
    setSearched(false);
    setFilteredJobs([]);
    setPost("");
    setJobID("");
    setLocation("");
    setError("");
  };

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
              placeholder="Enter the title"
              className="lg:flex-1 outline-none text-slate-800 text-lg max-sm:min-w-full border-r-2 border-slate-200 lg:min-w-80"
              onChange={postChange}
              value={post}
            />
            <input
              type="text"
              placeholder="Enter job ID"
              className="flex-1 outline-none text-slate-800 text-lg border-r-2 border-slate-200 max-[895px]:max-w-36 max-md:max-w-28 max-[750px]:w-auto max-sm:min-w-full"
              onChange={jobChange}
              value={jobID}
            />
            <input
              type="text"
              placeholder="Enter location"
              className="flex-1 outline-none text-slate-800 max-sm:min-w-full text-lg border-slate-400 max-[920px]:max-w-44 max-[830px]:max-w-32 max-sm:border-r-2 max-sm:border-slate-200"
              onChange={locationChange}
              value={location}
            />
            <button
              className="bg-blue-600 text-white px-7 py-[7px] rounded-full font-medium active:scale-95 max-[780px]:mr-2 max-sm:mx-auto"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        {!searched && (
          <h1 className="text-center mb-8 text-2xl font-semibold">
            Recently added jobs
          </h1>
        )}
        {searched && (
          <h1 className="text-center mb-8 text-2xl font-semibold">
            Search Results
          </h1>
        )}
        {isLoading && (
          <div className="spinner-container flex flex-col items-center mt-44">
            <BeatLoader color="#36D7B7" size={15} margin={5} />
            <p className="mt-4">Loading job details...</p>
          </div>
        )}
        {!isLoading && jobs.length > 0 && !searched && (
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
        {!isLoading && searched && filteredJobs.length > 0 && (
          <div className="grid grid-cols-3 gap-y-10 gap-8 max-[980px]:items-center max-xl:grid-cols-2 max-sm:grid-cols-1">
            {filteredJobs.map((job) => (
              <JobCard key={job.jobid} job={job} />
            ))}
          </div>
        )}
        {!isLoading && searched && filteredJobs.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 mb-16">
            <p className="text-center text-2xl font-semibold">{error}</p>
          </div>
        )}
        <div className="flex items-center justify-center mt-8 gap-6 flex-wrap">
          <Link to="/admin/job-management/view-jobs">
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
          </Link>
          {searched && (
            <button
              className="border-2 border-red-600 px-4 py-2 rounded-md text-red-600 hover:text-white hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={cancelFilters}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width={20}
                className="inline-block mr-2"
                fill="currentColor"
              >
                <path d="M3.9 22.9C10.5 8.9 24.5 0 40 0H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6V288.9L9 65.3C-.7 53.4-2.8 36.8 3.9 22.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm59.3 107.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L432 345.4l-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L409.4 368l-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L432 390.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L454.6 368l36.7-36.7z" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobManagement;
