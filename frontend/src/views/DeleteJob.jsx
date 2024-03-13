import AdminSidebar from "../components/AdminSidebar";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import toastr from "toastr";
import JobDetails from "../components/JobDetails";

const DeleteJob = () => {
  const [jobID, setJobID] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/searchJob/${jobID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok && response.status === 404) {
        setError("Job not found");
        toastr.error("Uh oh, Job not found!", "Error");
        setJobDetails(null);
        return;
      } else if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobDetails(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch job details");
      toastr.error("Uh oh, Failed to fetch job details", "Error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };
  const handleCancel = () => {
    setShowConfirmDialog(false);
  };
  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toastr.error(
          "You need to be logged in to perform this action",
          "Error"
        );
        return;
      }
      const response = await fetch(
        "http://localhost:3000/api/admin/deleteJob",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ jobID }),
        }
      );
      if (!response.ok) {
        toastr.error("Uh oh, there was a problem. Please try again", "Error");
      } else if (response.ok) {
        toastr.success("Job deleted successfully", "Success");
        setJobDetails(null);
        setJobID("");
      }
    } catch (err) {
      console.log(err);
      toastr.error("Uh oh, there was a problem. Please try again", "Error");
    } finally {
      setShowConfirmDialog(false);
    }
  };
  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-4">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Job Management / Delete Job
        </p>
        <h2 className="text-3xl mt-2 mb-4 font-medium text-slate-800">
          Delete Job
        </h2>
        <div className="flex flex-col items-center justify-center p-6 mt-8">
          <form className="w-full max-w-md">
            <div className="flex items-center border-b border-coral-green py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none tracking-wider"
                type="text"
                placeholder="Enter Job ID"
                aria-label="Employee ID"
                value={jobID}
                onChange={(e) => setJobID(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-coral-green hover:bg-green-700 border-coral-green hover:border-green-700 text-sm border-4 text-white py-1 px-4 rounded-md"
                type="submit"
                disabled={isLoading}
                onClick={handleSearch}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {error && <div className="text-red-500 mt-8">{error}</div>}
          {isLoading && (
            <div className="spinner-container flex flex-col items-center mt-44">
              <BeatLoader color="#36D7B7" size={15} margin={5} />
              <p className="mt-4">Loading job details...</p>
            </div>
          )}
          {jobDetails && (
            <>
              <button
                className="mt-8 bg-white border border-red-500 uppercase hover:bg-red-500 active:scale-95 text-red-500 hover:text-white font-medium px-3 py-2 rounded-md"
                onClick={handleDeleteClick}
              >
                Delete Job
              </button>
            </>
          )}
          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h4 className="text-lg font-bold mb-4">Are you sure?</h4>
                <p>This action cannot be undone.</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-2 rounded-md mr-4"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {jobDetails && <JobDetails jobDetails={jobDetails} />}
      </div>
    </div>
  );
};

export default DeleteJob;
