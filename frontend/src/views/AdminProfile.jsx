import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import MobileAdminSidebar from "../components/MobileAdminSidebar";
const AdminProfile = () => {
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleClick = async () => {
    const errors = validateInputs();
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toastr.error(
            "You are not authorized to perform this action",
            "Error"
          );
          return;
        }
        const response = await fetch(
          "http://localhost:3000/api/admin/adminProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword,
              newPassword,
              confirmNewPassword,
            }),
          }
        );
        if (!response.ok) {
          toastr.error("Uh oh! Check the details", "Error");
        } else {
          toastr.success("Password changed successfully!", "Success");
        }
      } catch (err) {
        console.log(err);
      }
    } else console.log(errors);
  };
  const validateInputs = () => {
    let errors = {};
    if (!currentPassword.trim()) {
      errors.currentPassword = "This field is required";
    }
    if (!newPassword.trim()) {
      errors.newPassword = "This field is required";
    }
    if (!confirmNewPassword.trim()) {
      errors.confirmNewPassword = "This field is required";
    }
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword =
        "New password and confirm password are not same";
    }
    setErrors(errors);
    return errors;
  };
  return (
    <div>
      <>
        <AdminSidebar />
        <MobileAdminSidebar />
      </>
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-8">
        <div>
          <p className="pt-8 text-slate-500">Pages / Profile</p>

          <h2 className="text-3xl mt-2 mb-3 font-medium text-slate-800">
            Profile
          </h2>
        </div>
        <div className="max-w-3xl  px-4 py-4 mx-auto bg-[url('./assets/images/book-bg.png')] bg-white border-slate-300  shadow-lg rounded-lg mt-8">
          <h2 className="mb-6 text-2xl font-medium">Change Password</h2>
          <div className="flex gap-[110px] mb-2 items-center max-[544px]:flex-col max-[544px]:gap-4 max-[544px]:items-start">
            <p className="max-w-lg font-medium">Old password : </p>
            <input
              type="password"
              className="py-1 w-60 rounded-sm outline-none border-[2px] px-2 max-[544px]:w-full"
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
          </div>
          {errors.currentPassword && (
            <p className="text-red-600 text-sm mb-3">
              {errors.currentPassword}
            </p>
          )}
          <div className="flex gap-[103px] mb-2 items-center max-[544px]:flex-col max-[544px]:gap-4 max-[544px]:items-start">
            <p className="font-medium">New password : </p>
            <input
              type="password"
              className="py-1 w-60 rounded-sm outline-none border-[2px] px-2 max-[544px]:w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {errors.newPassword && (
            <p className="text-red-600 text-sm mb-3">{errors.newPassword}</p>
          )}
          <div className="flex gap-10 mb-2 items-center max-[544px]:flex-col max-[544px]:gap-4 max-[544px]:items-start">
            <p className="font-medium">Confirm new password : </p>
            <input
              type="password"
              className="py-1 w-60 rounded-sm outline-none border-[2px] px-2 max-[544px]:w-full"
              onChange={(e) => setconfirmNewPassword(e.target.value)}
            />
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-600 text-sm mb-3">
              {errors.confirmNewPassword}
            </p>
          )}
          <div className="mt-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-sm"
              onClick={handleClick}
            >
              Change Account Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
