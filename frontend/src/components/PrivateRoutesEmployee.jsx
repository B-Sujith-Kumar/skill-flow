import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutesEmployee = () => {
  const isEmployee = localStorage.getItem("Type") === "employee";
  return <>{isEmployee ? <Outlet /> : <Navigate to="/user/login" />}</>;
};

export default PrivateRoutesEmployee;
