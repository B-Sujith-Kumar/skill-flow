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
import ViewAllJobs from "./views/ViewAllJobs";
import IndividualJobPage from "./views/IndividualJobPage";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminProfile from "./views/AdminProfile";
import ResetPasswordUser from "./views/ResetPasswordUser";
import UpdateDetailsEmp from "./views/UpdateDetailsEmp";
import PrivateRoutesEmployee from "./components/PrivateRoutesEmployee";
import ViewApplicants from "./views/ViewApplicants";
import ApplicantDetails from "./views/ApplicantDetails";
import AppliedJobs from "./views/AppliedJobs";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Loginadmin />} />
          <Route path="/user/login" element={<Loginuser />} />
          <Route path="/admin/dashboard" element={<Admindashboard />} />
          <Route element={<PrivateRoutes />}>
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
              path="/admin/job-management/view-jobs"
              element={<ViewAllJobs />}
            ></Route>
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
              path="/admin/job-management/view-job/:id"
              element={<IndividualJobPage />}
            />
            <Route
              path="/admin/applicants/:jobid"
              element={<ViewApplicants />}
            />
            <Route path="/admin/:id" element={<ApplicantDetails />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
          <Route element={<PrivateRoutesEmployee />}>
            <Route path="/user/dashboard" element={<JobManagement />} />
            <Route path="/user/setPassword" element={<ResetPasswordUser />} />
            <Route path="/user/update-details" element={<UpdateDetailsEmp />} />
            <Route path="/user/view-job/:id" element={<IndividualJobPage />} />
            <Route path="/user/view-jobs" element={<ViewAllJobs />} />
            <Route path="/user/applied-jobs/:id" element={<AppliedJobs />} />
          </Route>
          <Route path="/about" element={<h1 className="">About</h1>} />
          <Route path="/contact" element={<h1 className="">Contact</h1>} />
          <Route path="*" element={<h1 className="">Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
