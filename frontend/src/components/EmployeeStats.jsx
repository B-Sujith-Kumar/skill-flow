const EmployeeStats = () => {
  return (
    <div className="grid grid-cols-4 py-8 rounded-lg gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:py-2 [1200px]:grid-cols2">
      <div className="flex items-center gap-6 border-[1px] border-white shadow-lg rounded-md py-8 pl-6 bg-white">
        <div className="bg-indigo-100 px-4 py-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            width={30}
            fill="#4f46e5"
          >
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-2xl font-medium">89,935</p>
          <p className="text-md text-slate-600">Total Employees</p>
        </div>
      </div>
      <div className="flex items-center gap-6 border-[1px] border-white shadow-lg rounded-md py-8 pl-6 bg-white">
        <div className="bg-orange-100 px-5 py-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width={24}
            fill="#FFA500"
          >
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM128 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM80 432c0-44.2 35.8-80 80-80h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-medium">89,935</p>
          <p className="text-md text-slate-600">Total Employees</p>
        </div>
      </div>
      <div className="flex items-center gap-6 border-[1px] border-white shadow-lg rounded-md py-8 pl-6 bg-white">
        <div className="bg-pink-100 px-4 py-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={30}
            fill="#FF6Ec7"
          >
            <path d="M176 56V96H336V56c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zM128 96V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96v32V480H128V128 96zM64 96H96V480H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64zM448 480H416V96h32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-medium">89,935</p>
          <p className="text-md text-slate-600">Total Employees</p>
        </div>
      </div>
      <div className="flex items-center gap-6 border-[1px] border-white shadow-lg rounded-md py-8 pl-6 bg-white">
        <div className="bg-green-100 px-4 py-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={30}
            fill="#3CB043"
          >
            <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-medium">89,935</p>
          <p className="text-md text-slate-600">Total Employees</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStats;
