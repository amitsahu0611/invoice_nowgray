/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompany} from "../redux/slice/company.slice";
import {showError, showSuccess} from "../../utils/config";
import {createUser, updateUser} from "../redux/slice/auth.slice";

const CreateStaff = ({setActiveTab}) => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.company.allCompanies);
  const staffData = useSelector((state) => state.auth.singleStaff);

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [update, setUpdate] = useState(false);
  const [staffId, setStaffId] = useState(null);

  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    status: true,
  });

  useEffect(() => {
    if (staffData) {
      setForm((prev) => ({
        ...prev,
        company: staffData?.company_id || "",
        name: staffData?.full_Name || "",
        phone: staffData?.mobile || "",
        email: staffData?.email || "",
        role: staffData?.role_id || "",
        password: staffData?.password || "",
        status: staffData?.is_active ?? true,
      }));
      setStaffId(staffData?.user_id);
      setUpdate(true);
    }
  }, [staffData]);

  useEffect(() => {
    dispatch(getAllCompany());
  }, []);

  useEffect(() => {
    if (allCompanies?.length > 0) {
      setCompanies(allCompanies);
    }
  }, [allCompanies]);

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updateUser({
        id: staffId,
        data: {
          company_id: form?.company,
          full_Name: form?.name,
          email: form?.email,
          password: form?.password,
          mobile: form?.phone,
          role_id: form?.role,
          is_active: form?.status,
        },
      })
    );

    console.log("data", data);

    if (data?.payload?.status == 1) {
      setForm((prev) => ({
        ...prev,
        company: "",
        name: "",
        phone: "",
        email: "",
        role: "",
        password: "",
        status: true,
      }));
      setUpdate(false);
      setActiveTab("Staff List");
      showSuccess("Staff updated successfully.");
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      company: "",
      name: "",
      phone: "",
      email: "",
      role: "",
      password: "",
      status: true,
    }));
    setUpdate(false);
  };

  return (
    <div className='w-full max-w-8xl mx-auto mt-10 shadow-lg p-8 bg-white rounded-lg'>
      <h2 className='text-2xl font-semibold text-blue-gray-700 mb-6'>
        {update ? "Update Staff" : "Add New Staff"}
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
            {companies.map((company) => (
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

        {/* Phone */}
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

        {/* Email */}
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

        {/* Password */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Role */}
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
            <option value='1'>Admin</option>
            <option value='2'>Account</option>
            <option value='3'>Sales</option>
          </select>
        </div>

        {/* Status Toggle */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Status
          </label>
          <div className='flex items-center space-x-4'>
            <span className='text-sm font-medium text-gray-600'>Inactive</span>

            <label className='relative inline-flex items-center w-11 h-6 cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={form.status === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    status: !prev.status,
                  }))
                }
              />
              <div className='w-full h-full bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-colors duration-300'></div>
              <div className='absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5'></div>
            </label>

            <span className='text-sm font-medium text-gray-600'>Active</span>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className='pt-6 text-right'>
        <button
          type='submit'
          onClick={handleCancel}
          className='bg-gray-600 mr-3 text-white px-6 py-2 rounded-md hover:bg-gray-700'
        >
          Cancel
        </button>
        <button
          type='submit'
          onClick={update ? handleUpdate : handleSubmit}
          className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700'
        >
          {update ? "Update Staff" : "Add Staff"}
        </button>
      </div>
    </div>
  );
};

export default CreateStaff;
