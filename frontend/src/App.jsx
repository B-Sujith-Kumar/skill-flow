import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import Loginuser from "./views/Loginuser";
import Loginadmin from "./views/Loginadmin";
import Admindashboard from "./views/Admindashboard";
import EmployeeManagement from "./components/EmployeeManagement";
import AddEmployee from "./views/AddEmployee";
import DeleteEmployee from "./views/DeleteEmployee";
import UpdateEmployee from "./views/UpdateEmployee";
import JobManagement from "./components/JobManagement";
import AddJob from "./views/AddJob";
import DeleteJob from "./views/DeleteJob";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Loginadmin />} />
          <Route path="/user/login" element={<Loginuser />} />
          <Route path="/admin/dashboard" element={<Admindashboard />} />
          <Route
            path="/admin/employee-management"
            element={<EmployeeManagement />}
          />
          <Route path="/admin/job-management" element={<JobManagement />} />
          <Route path="/admin/job-management/add-job" element={<AddJob />} />
          <Route
            path="/admin/job-management/delete-job"
            element={<DeleteJob />}
          />
          <Route
            path="/admin/employee-management/add-employee"
            element={<AddEmployee />}
          />
          <Route
            path="/admin/employee-management/delete-employee"
            element={<DeleteEmployee />}
          />
          <Route
            path="/admin/employee-management/update-employee"
            element={<UpdateEmployee />}
          />
          <Route
            path="/user/dashboard"
            element={<h1 className="">User Dashboard</h1>}
          />
          <Route path="/about" element={<h1 className="">About</h1>} />
          <Route path="/contact" element={<h1 className="">Contact</h1>} />
          <Route path="*" element={<h1 className="">Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
