import AdminSidebar from "./AdminSidebar";
import { NavLink } from "react-router-dom";
import "../App.css";
import img from "../assets/icons/search.svg";

const JobManagement = () => {
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
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-14">
            <img
              className="text-gray-600 h-4 w-4 fill-current"
              src={img}
              alt="Search Icon"
            />
          </button>
        </div>

        <div className=" flex flex-1 md:flex-row flex-col justify-center items-center gap-10 mt-24">
          <div className="rounded-lg p-14 bg-orange-600 text-white cursor-pointer shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden font-bold text-xl">
            View Jobs
          </div>
          <div className="rounded-lg p-14 bg-pink-600 text-white cursor-pointer shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden font-bold text-xl">
            View Jobs
          </div>
          <div className="rounded-lg p-14 bg-gray-700 text-white cursor-pointer shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden font-bold text-xl">
            View Jobs
          </div>
          <div className="rounded-lg p-14 bg-yellow-400 text-white cursor-pointer shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden font-bold text-xl">
            View Jobs
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobManagement;
