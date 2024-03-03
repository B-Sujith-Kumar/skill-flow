import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import AllJobCard from "../components/AllJobCard";
import { BeatLoader } from "react-spinners";

const ViewAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState("");
  const thumbPosition = (salary / 50) * 100;
  const thumbOffset = "-20px";
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await fetch("http://localhost:3000/api/admin/allJobs")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          setIsLoading(false);
        });
    };
    fetchJobs();
  }, []);
  const salaryOnChange = (e) => {
    const newSalary = e.target.value;
    setSalary(e.target.value);
    if (salary !== 0) {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = jobs.filter((job) => job.salary >= newSalary);
        setFilteredJobs(filtered);
        setIsLoading(false);
      }, 500);
    }
  };
  return (
    <div>
      <AdminSidebar />
      <div className="min-h-screen main-content bg-dashboard font-rubik pb-8 overflow-hidden">
        <div className="min-w-full min-h-full flex ml-6 pr-12 max-md:justify-center">
          <div>
            <div className="flex flex-row items-start py-5 gap-x-12 gap-y-4 flex-wrap mt-4 px-4 rounded-md">
              <>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="salary-range"
                    className="text-lg font-medium mb-3"
                  >
                    Salary
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      id="salary-range"
                      name="experience"
                      min="3"
                      max="50"
                      value={salary}
                      onChange={salaryOnChange}
                      className="slider w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-8"
                    />
                    <div
                      className="thumb absolute -top-2 left-0 bg-black rounded-full text-xs w-8 h-8 flex items-center justify-center shadow-md"
                      style={{
                        marginLeft: `calc(${thumbPosition}% + ${thumbOffset})`,
                      }}
                    >
                      <span className="text-white text-sm font-medium">
                        {salary}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="location-select"
                    className="text-lg font-medium"
                  >
                    Location
                  </label>
                  <div className="">
                    <select
                      id="location-select"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-select block w-52 rounded-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring mt-4 px-1 focus:ring-blue-200 focus:ring-opacity-50 text-gray-700 text-md py-1 bg-slate-200"
                    >
                      <option value="">Select a location</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                </div>
              </>
            </div>
            {!isLoading && filteredJobs.length === 0 && salary === 0 && (
              <section className="grid grid-cols-2 gap-x-6 max-md:grid-cols-1">
                {jobs.map((job, i) => (
                  <AllJobCard key={i} job={job} />
                ))}
              </section>
            )}
            {!isLoading && filteredJobs.length > 0 && (
              <section className="grid grid-cols-2 gap-x-6 max-md:grid-cols-1">
                {filteredJobs.map((job, i) => (
                  <AllJobCard key={i} job={job} />
                ))}
              </section>
            )}
          </div>
        </div>
        {!isLoading && salary !== 0 && filteredJobs.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-44">
            <p className="text-center text-xl font-medium">
              No jobs found with the given salary range.
            </p>
          </div>
        )}
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

export default ViewAllJobs;
