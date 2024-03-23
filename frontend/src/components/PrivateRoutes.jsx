import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return <>{isAdmin ? <Outlet /> : <Navigate to="/admin/login" />}</>;
};

export default PrivateRoutes;
