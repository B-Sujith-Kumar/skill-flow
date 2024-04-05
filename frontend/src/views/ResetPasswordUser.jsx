import { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

const ResetPasswordUser = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    // Reset errors when password or confirmPassword changes
    setErrors({});
  }, [password, confirmPassword]);

  const onSubmit = async () => {
    let newErrors = {};
    if (password !== confirmPassword) {
      newErrors.final = "Passwords do not match";
    }
    if (password === "" || password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (confirmPassword === "" || confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/employee/set-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            employeeID: localStorage.getItem("ID"),
          }),
        }
      );

      if (!response.ok) {
        toastr.error("Uh oh! Could not update password", "Error");
      } else {
        toastr.success("Password updated successfully!", "Success");
        nav("/user/dashboard");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative h-screen w-full bg-no-repeat font-rubik bg-cover bg-center bg-[url('./assets/images/ResetPassword.jpg')]">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="max-w-lg mx-auto flex flex-col min-h-full justify-around relative">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-center text-3xl mb-4 font-semibold tracking-wide">
            Welcome to SkillFlow
          </h2>
          <div className="bg-[#1f2937] px-10 py-8 relative rounded-md max-sm:mx-4 max-sm:px-5">
            <h2 className="text-white text-2xl mb-7 mt-3 font-semibold">
              Change your password
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white text-lg">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded-md px-2 py-2 mt-2 mb-2 bg-[#374151] text-white"
                placeholder="Enter New Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ zIndex: 1 }}
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="confirmPassword" className="text-white text-lg">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="rounded-md px-2 py-2 mt-2 mb-2 bg-[#374151] text-white"
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ zIndex: 1 }}
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
            {errors.final && (
              <p className="text-red-500 text-sm">{errors.final}</p>
            )}
            <button
              className="bg-[#1d4ed8] text-white py-2 rounded-md w-full mt-6"
              onClick={onSubmit}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordUser;
