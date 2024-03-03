import logo from "../assets/images/78730.gif";

const AllJobCard = ({ job }) => {
  const day = Math.round(
    Math.abs((new Date() - new Date(job.publishedAt)) / (1000 * 60 * 60 * 24))
  );
  
  return (
    <div>
      <div className="font-rubik bg-white px-6 py-4 rounded-3xl max-w-4xl mx-auto shadow-lg mt-8 cursor-pointer transition duration-300 ease-in-out hover:shadow-xl">
        <div className="flex justify-between flex-wrap-reverse">
          <div>
            <h2 className="max-[611px]:mt-3">{job.title}</h2>
            <div className="flex gap-6 mt-4 flex-wrap gap-y-3">
              <div className="flex gap-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={12}
                  fill="#717b9e"
                >
                  <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
                </svg>
                <span className="text-slate-600 text-sm">{job.experience}</span>
              </div>
              <div>
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    width={10}
                    fill="#717b9e"
                  >
                    <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
                  </svg>
                  <span className="text-slate-600 text-sm">
                    Upto {job.salary} LPA
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width={14}
                  fill="#717b9e"
                >
                  <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>
                <span className="truncate w-44 text-slate-600 text-sm tracking-wide">
                  {job.location}
                </span>
              </div>
            </div>
          </div>
          <img src={logo} alt="" width={65} className="border rounded-xl" />
        </div>
        <div className="flex gap-3 mt-2 max-[611px]:mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width={11}
            fill="#717b9e"
            className="shrink-0"
          >
            <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
          <span className="truncate max-w-sm grow-0 max-lg:max-w-xs text-sm text-slate-600">
            {job.description}
          </span>
        </div>
        <div className="flex gap-x-4 mt-2 flex-wrap gap-y-1 items-center">
          {job.skills.map(
            (skill, index) =>
              index < 4 && (
                <li key={index} className="text-slate-500">
                  <span className="text-slate-500 text-xs" key={index}>
                    {skill}
                  </span>
                </li>
              )
          )}
        </div>
        <div className="flex gap-4 text-xs items-center mt-4">
          <div>
            <p className="text-slate-500 text-xs border-r-2 pr-4">
              {day} {day > 1 ? "days ago" : "day ago"}
            </p>
          </div>
          <div className="text-slate-500">
            Job ID: <span className="text-slate-500">{job.jobid}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobCard;
