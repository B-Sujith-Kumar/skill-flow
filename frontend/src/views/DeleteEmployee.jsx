import AdminSidebar from "../components/AdminSidebar";
import "../App.css";
import { useState } from "react";
import DisplayEmpDetails from "../components/DisplayEmpDetails";
import { BeatLoader } from "react-spinners";
import toastr from "toastr";
import MobileAdminSidebar from "../components/MobileAdminSidebar";

const DeleteEmployee = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSearch = async (e) => {
    console.log("Employee ID: ", employeeID);
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setEmployeeDetails(null);

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
        `http://localhost:3000/api/admin/search/${employeeID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok && response.status === 404) {
        setError("Employee not found");
        console.log("Employee not found");
        toastr.error("Uh oh, employee not found!", "Error");
        setEmployeeDetails(null);
        return;
      } else if (response.ok) {
        const data = await response.json();
        setEmployeeDetails(data.employee);
        console.log(data);
      }
    } catch (err) {
      setError("Failed to fetch employee details");
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
      const response = await fetch("http://localhost:3000/api/admin/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ employeeID }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          toastr.error(
            "You need to be logged in to perform this action",
            "Error"
          );
          setError("You need to be logged in to perform this action");
          return;
        } else if (response.status === 403) {
          toastr.error("Invalid token", "Error");
          setError("Failed to fetch employee details");
          return;
        } else {
          toastr.error("Uh oh, there was a problem. Please try again", "Error");
          setError("Failed to fetch employee details");
        }
      } else if (response.ok && response.status === 200) {
        toastr.success("Employee deleted successfully", "Success");
        setEmployeeDetails(null);
        setEmployeeID("");
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
      <>
        <AdminSidebar />
        <MobileAdminSidebar />
      </>
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Employee Management / Delete an Employee
        </p>
        <h2 className="text-3xl mt-2 font-medium text-slate-800">
          Delete an employee
        </h2>
        <div className="flex flex-col items-center justify-center p-6 mt-8">
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="flex items-center border-b border-coral-green py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none tracking-wider"
                type="text"
                placeholder="Enter Employee ID"
                aria-label="Employee ID"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-coral-green hover:bg-green-700 border-coral-green hover:border-green-700 text-sm border-4 text-white py-1 px-4 rounded-md"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {error && <div className="text-red-500 mt-8">{error}</div>}
          {employeeDetails && (
            <>
              <button
                className="mt-8 bg-white border border-red-500 uppercase hover:bg-red-500 active:scale-95 text-red-500 hover:text-white font-medium px-3 py-2 rounded-md"
                onClick={handleDeleteClick}
              >
                Delete Employee
              </button>
            </>
          )}
        </div>
        {isLoading && (
          <div className="spinner-container flex flex-col items-center mt-44">
            <BeatLoader color="#36D7B7" size={15} margin={5} />
            <p className="mt-4">Loading employee details...</p>
          </div>
        )}
        {employeeDetails && (
          <DisplayEmpDetails employeeData={employeeDetails} />
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
    </div>
  );
};

export default DeleteEmployee;
