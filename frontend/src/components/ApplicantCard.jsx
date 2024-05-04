const ApplicantCard = ({ applicant }) => {
  console.log(applicant.credentials.employeeID);
  return (
    <div className="flex flex-col gap-y-3 justify-start items-start rounded-lg shadow-lg bg-white py-5 px-6">
      <a
        href={`/admin/${applicant.credentials.employeeID}`}
        className="w-full"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex flex-col gap-y-3 justify-start items-start w-full">
          <img
            src={applicant.additionalInformation.profileImage}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
            alt=""
          />
          <p className="text-center font-rubik text-lg font-medium mt-2">
            {applicant.personalInformation.fullName}
          </p>

          <p className="text-center font-rubik text-sm text-gray-500 mt-1 flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={15}
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
            {applicant.contactInformation.email}
          </p>
          <p className="text-center font-rubik text-sm text-gray-500 mt-1 flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={15}
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            {applicant.contactInformation.phoneNumber}
          </p>
        </div>
      </a>

      <div className="flex gap-4 mt-2 flex-wrap">
        {applicant.additionalInformation.skills
          .slice(0, 3)
          .map((skill, index) => (
            <span
              key={index}
              className="text-slate-800 text-[14px] border-[1.5px] px-3 py-1 rounded-full hover:text-blue-500
              hover:border-blue-500 transition duration-300 ease-in-out text-center border-slate-400 cursor-default"
            >
              {skill}
            </span>
          ))}
      </div>
      <div className="mt-4 flex gap-x-5">
        <a
          href={applicant.additionalInformation.resumeFile}
          className="text-white bg-blue-600 px-4 py-2 mx-auto rounded-md"
          target="_blank"
          rel="noreferrer"
        >
          View Resume
        </a>
        <select name="" id="">
          <option value="">Applied</option>
          <option value="">Shortlisted</option>
          <option value="">Accepted</option>
          <option value="">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default ApplicantCard;
