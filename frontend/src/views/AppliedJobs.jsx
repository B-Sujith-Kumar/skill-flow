import { Link, useParams } from "react-router-dom";
import companyLogo from "../assets/images/78730.gif";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { useEffect, useState } from "react";
import toastr from "toastr";

const AppliedJobs = () => {
  const { id } = useParams();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [toWithdraw, setToWithdraw] = useState("");
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      await fetch(`http://localhost:3000/api/employee/appliedJobs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAppliedJobs(data);
        });
    };
    fetchAppliedJobs();
  }, [id]);

  const handleDeleteClick = (jobId) => {
    setToWithdraw(jobId);
    console.log(jobId);
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
      const res = await fetch(
        "http://localhost:3000/api/employee/withdraw/" + toWithdraw,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employeeId: id }),
        }
      );
      if (!res.ok) {
        toastr.error("Failed to withdraw application", "Error");
        return;
      }
      toastr.success("Application withdrawn successfully", "Success");
      setAppliedJobs(appliedJobs.filter((job) => job.jobId !== toWithdraw));
      setToWithdraw("");
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  return (
    <div>
      <EmployeeSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-4">
        <h1 className="text-center pt-5 font-rubik text-2xl font-medium">
          Applied Jobs
        </h1>
        {appliedJobs.length === 0 ? (
          <div className="text-center mt-8 text-xl min-h-full w-full">
            <h1>No jobs applied yet 😢. Start applying</h1>
            <Link to="/user/view-jobs" className="mt-8 inline-block text-base bg-blue-600 text-white px-3 py-2 rounded-md">View Jobs</Link>
          </div>
        ) : (
          <div className="grid gap-x-8 grid-cols-3 gap-y-8 max-lg:grid-cols-2 mt-8 max-[684px]:grid-cols-1">
            {appliedJobs.map((job, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2"
              >
                <img
                  src={companyLogo}
                  alt=""
                  width={70}
                  className="border rounded-xl"
                />
                <h1 className="text-lg font-bold">{job.jobTitle}</h1>
                <div className="flex gap-x-6 mt-1">
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
                      Upto {job.salary} LPA
                    </span>
                  </div>
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
                      {job.experience}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-slate-800">Status: </span>
                  <span
                    className={`text-sm ${
                      job.status === "Applied" || job.status === "Shortlisted"
                        ? "text-blue-600"
                        : job.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex gap-2 mt-2">
                  <Link to={`/user/view-job/${job.jobId}`}>
                    <button className="bg-blue-600 rounded-lg text-white px-3 py-2">
                      View Details
                    </button>
                  </Link>
                  {job.status === "Applied" && (
                    <button
                      className="bg-red-600 rounded-lg text-white px-3 py-2"
                      onClick={handleDeleteClick.bind(this, job.jobId)}
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h4 className="text-lg font-bold mb-4">Are you sure?</h4>
            <p>Do you want to withdraw your application?</p>
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
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
