/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompany} from "../redux/slice/company.slice";
import {showError} from "../../utils/config";
import {createUser} from "../redux/slice/auth.slice";

const CreateStaff = ({setActiveTab}) => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.company.allCompanies);

  const [loading, setLoading] = useState(false);
  const [companies, setcompanies] = useState([]);
  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    status: "active",
  });

  useEffect(() => {
    dispatch(getAllCompany());
  }, []);

  useEffect(() => {
    if (allCompanies?.length > 0) {
      setcompanies(allCompanies);
    }
  }, [allCompanies]);

  console.log("companies", companies);

  const handleChange = (field, value) => {
    setForm((prev) => ({...prev, [field]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {company, name, phone, email, role, password} = form;

    if (!company) return showError("Please select a company.");
    if (!name) return showError("Please enter staff name.");
    if (!phone) return showError("Please enter staff phone number.");
    if (!email) return showError("Please enter staff email.");
    if (!role) return showError("Please enter staff role.");
    if (!password) return showError("Please enter staff password.");

    setLoading(true);
    try {
      await dispatch(createUser(form));
      setActiveTab("Staff List");
      console.log("Form Submitted: ", form);
      // Optional: navigate or reset form here
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
            {companies?.length > 0 &&
              companies?.map((company) => (
                <option key={company?.company_id} value={company?.company_id}>
                  {company?.company_name}
                </option>
              ))}
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

        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            placeholder='Email Password'
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
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
          {/* <label className='mb-1 text-sm font-medium text-gray-700'>
            Status
          </label> */}
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
