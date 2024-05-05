import EmployeeSidebar from "../components/EmployeeSidebar";

const AppliedJobs = () => {
  return (
    <div>
      <EmployeeSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-4">
        <h1 className="text-center pt-5 font-rubik text-2xl font-medium">
          Applied Jobs
        </h1>
      </div>
    </div>
  );
};

export default AppliedJobs;
