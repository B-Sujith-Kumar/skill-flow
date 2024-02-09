<form action="" className="mt-8 pb-6">
  <div className="border-[1px] border-slate-300 pb-12 px-7 pt-4 rounded-lg shadow-lg bg-[url('./assets/images/book-bg.png')] bg-white">
    <h2 className="text-xl font-semibold leading-7 text-gray-900">
      Personal Information
    </h2>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-2">
        <label
          htmlFor="title"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="firstName"
            id="first-name"
            autoComplete="given-name"
            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
            required
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="middle-name"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Department
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="middleName"
            id="middle-name"
            autoComplete="middle-name"
            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 active:shadow-lg px-4 tracking-wide"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="last-name"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Last name <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="lastName"
            id="last-name"
            autoComplete="family-name"
            className="block w-full rounded-md outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
            required
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
          )}
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="gender"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <select
            id="gender"
            name="gender"
            autoComplete="gender-type"
            className="block w-full outline-none rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:max-w-xs sm:text-sm sm:leading-6 min-w-full px-4 tracking-wide"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="dob"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="dateOfBirth"
            id="dob"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
            required
          />
          {formErrors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.dateOfBirth}
            </p>
          )}
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="email"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Email address <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="phnumber"
          className="block text-md font-medium leading-6 text-gray-900"
        >
          Phone number <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="phnumber"
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            autoComplete="phnumber"
            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-green sm:text-sm sm:leading-6 px-4 tracking-wide"
            required
            minLength={10}
            maxLength={10}
          />
          {formErrors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.phoneNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</form>;
