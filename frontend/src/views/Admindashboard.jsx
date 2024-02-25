import AdminSidebar from "../components/AdminSidebar";
import "../App.css";

const Admindashboard = () => {
  return (
    <div className=" w-screen min-h-screen">
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard">
        Main admin dashboard
      </div>
    </div>
  );
};

export default Admindashboard;
