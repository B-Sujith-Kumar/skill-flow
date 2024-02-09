import AdminSidebar from "../components/AdminSidebar";

const DeleteJob = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6">
        <p className="pt-8 text-slate-500 max-sm:text-sm">
          Pages / Job Management / Delete Job
        </p>
        <h2 className="text-3xl mt-2 mb-4 font-medium text-red-600">
          Delete Job
        </h2>
      </div>
    </div>
  );
};

export default DeleteJob;
