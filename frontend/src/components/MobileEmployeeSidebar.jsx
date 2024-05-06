import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import hamburger from "../../public/hamburger.svg";
import close from "../../public/close.svg";

const MobileEmployeeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ID");
    localStorage.removeItem("Type");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <>
      {!isOpen && (
        <nav className="py-4 px-8 lg2:hidden flex justify-between">
          <h1 className="text-3xl font-rubik">
            <Link to="/user/dashboard">
              <span className="font-bold">Skill</span> Flow
            </Link>
          </h1>
          <img
            src={hamburger}
            alt=""
            width={20}
            onClick={() => setIsOpen(true)}
          />
        </nav>
      )}
      {isOpen && (
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg2:hidden fixed min-h-screen bg-white z-10 w-full top-0 left-0 px-7 bg-img`}
        >
          <div className="flex justify-between pt-10">
            <h1 className="text-3xl font-rubik">
              <span className="font-bold">Skill</span> Flow
            </h1>
            <img
              src={close}
              width={23}
              height={23}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <ul className="flex flex-col gap-7 mt-20">
            <NavLink to="/user/dashboard">
              <li className="cursor-pointer flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width={16}
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                Home
              </li>
            </NavLink>
            <NavLink to={`/user/applied-jobs/${localStorage.getItem("ID")}`}>
              <li className="cursor-pointer flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={16}
                >
                  <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                </svg>
                Applied Jobs
              </li>
            </NavLink>
            <NavLink to="/user/update-details">
              <li className="cursor-pointer flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={16}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                Profile
              </li>
            </NavLink>
            <NavLink to={`/user/notifications/${localStorage.getItem("ID")}`}>
              <li className="cursor-pointer flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={16}
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                </svg>
                Notifications
              </li>
            </NavLink>
            <li
              className="cursor-pointer flex gap-5 items-center"
              onClick={handleLogOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={16}
              >
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
              Log out
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileEmployeeSidebar;
