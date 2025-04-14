/** @format */

import React, {useState} from "react";

const CreateStaff = ({companies = [], onSubmit}) => {
  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    role: "",
    status: "active",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({...prev, [field]: value}));
  };

  const toggleStatus = () => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {company, name, phone, email, role} = form;
    if (company && name && phone && email && role) {
      console.log("Form Submitted: ", form);
      if (onSubmit) onSubmit(form);
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <div className='w-full max-w-8xl mx-auto mt-10 shadow-lg p-8 bg-white rounded-lg'>
      <h2 className='text-2xl font-semibold text-blue-gray-700 mb-6'>
        Add New Staff
      </h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {/* Company Select */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Select Company
          </label>
          <select
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            <option value=''>-- Select Company --</option>
            {companies.length > 0 ? (
              companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))
            ) : (
              <>
                <option value='HTML'>Material Tailwind HTML</option>
                <option value='React'>Material Tailwind React</option>
                <option value='Vue'>Material Tailwind Vue</option>
                <option value='Angular'>Material Tailwind Angular</option>
                <option value='Svelte'>Material Tailwind Svelte</option>
              </>
            )}
          </select>
        </div>

        {/* Staff Name */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Staff Name
          </label>
          <input
            type='text'
            placeholder='Enter Name'
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Staff Phone */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Phone
          </label>
          <input
            type='tel'
            placeholder='Phone Number'
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Staff Email */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            placeholder='Email Address'
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Staff Role */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Staff Role
          </label>
          <select
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            <option value=''>-- Choose Role --</option>
            <option value='admin'>Admin</option>
            <option value='account'>Account</option>
            <option value='sales'>Sales</option>
          </select>
        </div>

        {/* Status Toggle */}
        {/* Status Toggle */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Status
          </label>
          <div className='flex items-center space-x-4'>
            <span className='text-sm font-medium text-gray-600'>Inactive</span>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={form.status === "active"}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    status: prev.status === "active" ? "inactive" : "active",
                  }))
                }
              />
              <div className='w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-300'></div>
              <div className='absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5'></div>
            </label>
            <span className='text-sm font-medium text-gray-600'>Active</span>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className='pt-6 text-right'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700'
        >
          Add Staff
        </button>
      </div>
    </div>
  );
};

export default CreateStaff;
