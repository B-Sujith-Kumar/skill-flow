import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  console.log(isAdmin);
  const nav = useNavigate();
  useEffect(() => {
    if (isAdmin) {
      nav("/admin/dashboard");
    }
  }, []);
  return (
    <>
      <div className="max-h-screen overflow-hidden">
        <Navbar />
        <div className="flex min-w-full  font-rubik min-h-screen max-h-screen max-lg:flex-col max-lg:bg-gradient-to-bl from-white to-green-50 via-slate-50">
          <div className="sm:flex-1 flex max-sm:pt-6 flex-col justify-center items-center gap-8 lg:bg-gradient-to-r from-white to-green-50 via-slate-50 max-lg:justify-start">
            <div className="flex flex-col items-center gap-3 max-lg:mt-8">
              <p className="uppercase bg-coral-green text-white px-2 rounded-md">
                Company
              </p>
              <h2 className="text-4xl font-medium">
                For <span className="text-coral-green">Administrator</span>
              </h2>
            </div>
            <p className="max-w-md text-center text-lg max-sm:mx-3 text-slate-700">
              We are the market-leading technical interview platform to identify
              and hire developers with the right skills.
            </p>
            <Link to="/admin/login">
              {" "}
              <button
                className="bg-coral-green px-16 py-3 rounded-md text-white"
                style={{ border: "1px solid #068932" }}
              >
                Login
              </button>
            </Link>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center max-sm:mt-8 gap-8 max-lg:justify-start">
            <div className="flex flex-col items-center gap-3">
              <p className="uppercase text-white text-transparent">Company</p>
              <h2 className="text-4xl font-medium">
                For <span className="text-coral-green">Employees</span>
              </h2>
            </div>
            <p className="max-w-md text-center text-lg max-sm:mx-3 text-slate-700">
              Join over 21 million employees, practice coding skills, prepare
              for interviews, and get hired using the platform.
            </p>
            <Link to="/user/login">
              <button
                className="bg-none px-16 py-3 rounded-md text-slate-600"
                style={{ border: "1px solid black" }}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
