import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import JobDetails from "../components/JobDetails";
import { BeatLoader } from "react-spinners";
import EmployeeSidebar from "../components/EmployeeSidebar";
import MobileEmployeeSidebar from "../components/MobileEmployeeSidebar";
import MobileAdminSidebar from "../components/MobileAdminSidebar";

const IndividualJobPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState(null);
  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      await fetch(`http://localhost:3000/api/admin/searchJob/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setJob(data);
          setIsLoading(false);
        });
    };
    fetchJob();
  }, [id]);
  return (
    <div>
      {localStorage.getItem("Type") === "employee" ? (
        <>
          <EmployeeSidebar />
          <MobileEmployeeSidebar />
        </>
      ) : (
        <>
          <AdminSidebar />
          <MobileAdminSidebar />
        </>
      )}
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-4">
        <div className="pt-8">
          {job && <JobDetails jobDetails={job} isIndividual={true} />}
        </div>
        {isLoading && (
          <div className="spinner-container flex flex-col items-center mt-44">
            <BeatLoader color="#36D7B7" size={15} margin={5} />
            <p className="mt-4">Loading job details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualJobPage;
