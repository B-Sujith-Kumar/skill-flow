import AdminSidebar from "../components/AdminSidebar";
import "../App.css";
import MobileAdminSidebar from "../components/MobileAdminSidebar";

const Admindashboard = () => {
  return (
    <div className=" w-screen min-h-screen">
      <>
          <AdminSidebar />
          <MobileAdminSidebar />
        </>
      <div className="min-h-screen main-content bg-dashboard">
        Main admin dashboard
      </div>
    </div>
  );
};

export default Admindashboard;
