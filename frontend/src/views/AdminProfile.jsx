import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
const AdminProfile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleClick = () => {
    const errors = validateInputs();
    if (Object.keys(errors).length === 0) {
      console.log("Successful");
    } else console.log(errors);
  };
  const validateInputs = () => {
    let errors = {};
    if (!oldPassword.trim()) {
      errors.oldPassword = "This field is required";
    }
    if (!newPassword.trim()) {
      errors.newPassword = "This field is required";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "This field is required";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "New password and confirm password are not same";
    }
    setErrors(errors);
    return errors;
  };
  return (
    <div>
      <AdminSidebar />
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
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          {errors.oldPassword && (
            <p className="text-red-600 text-sm mb-3">{errors.oldPassword}</p>
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mb-3">
              {errors.confirmPassword}
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
