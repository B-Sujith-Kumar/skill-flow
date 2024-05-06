import { useParams } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import MobileEmployeeSidebar from "../components/MobileEmployeeSidebar";

const ViewNotifications = () => {
  const { id } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchNotifications = async () => {
      await fetch(`http://localhost:3000/api/employee/notifications/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setNotifications(data);
          setIsLoading(false);
        });
    };
    fetchNotifications();
  }, []);
  return (
    <div>
      <EmployeeSidebar />
      <MobileEmployeeSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pl-10 pr-10 max-sm:px-6 pb-4">
        <h1 className="text-center pt-4 text-2xl font-medium">Notifications</h1>
        {isLoading ? (
          <div className="spinner-container flex flex-col items-center mt-44">
            <BeatLoader color="#36D7B7" size={15} margin={5} />
            <p className="mt-4">Loading Notifications...</p>
          </div>
        ) : (
          <div className="mt-4">
            {notifications.reverse().map((notification) => (
              <div
                key={notification._id}
                className="bg-white p-4 px-6 rounded-lg shadow-xl mb-4"
              >
                <div className="flex items-center justify-between max-sm:flex-col max-sm:justify-start max-sm:items-start max-sm:gap-y-3">
                  <div className="flex gap-x-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width={16}
                    >
                      <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                    <h1 className="text-lg text-red-500 font-medium">
                      You have an update
                    </h1>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {new Date(notification.timestamp).toLocaleString(
                      "en-US",
                      options
                    )}
                  </p>
                </div>
                <h2 className="text-lg font-medium">{notification.title}</h2>
                <p className="mt-2">{notification.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNotifications;
