import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { useEffect, useState } from "react";
import ApplicantCard from "../components/ApplicantCard";

const ViewApplicants = () => {
  const { jobid } = useParams();
  const [applicant, setApplicant] = useState([]);
  const fetchApplicants = async () => {
    await fetch(`http://localhost:3000/api/admin/applicants/${jobid}`)
      .then((res) => res.json())
      .then((data) => {
        setApplicant(data);
      });
  };
  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div>
      {localStorage.getItem("Type") === "employee" ? (
        <EmployeeSidebar />
      ) : (
        <AdminSidebar />
      )}
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-4">
        <h1 className="text-center pt-5 font-rubik text-2xl font-medium">
          View Applicants
        </h1>
        <div className="grid gap-x-8 grid-cols-3 gap-y-8 max-lg:grid-cols-2 mt-8 max-[684px]:grid-cols-1">
          {applicant.map((applicant, i) => (
            <ApplicantCard applicant={applicant} jobid={jobid} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;
