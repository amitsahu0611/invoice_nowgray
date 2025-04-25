/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompany} from "../redux/slice/company.slice";
import {showError, showSuccess} from "../../utils/config";
import {
  clearStaffData,
  createUser,
  updateUser,
} from "../redux/slice/auth.slice";

const CreateStaff = ({setActiveTab}) => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.company.allCompanies);
  const staffData = useSelector((state) => state.auth.singleStaff);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [staffId, setStaffId] = useState(null);

  console.log("staffData ----- ", staffData);

  const [form, setForm] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    role_id: "",
    password: "",
    status: true,
  });

  console.log("form --------------------- ", form);

  // Set form data for update
  useEffect(() => {
    if (staffData) {
      console.log("staffData", staffData);
      setForm({
        company: staffData?.company_id || "",
        name: staffData?.full_Name || "",
        phone: staffData?.mobile || "",
        email: staffData?.email || "",
        role_id: staffData?.role_id ?? "",
        password: staffData?.password || "",
        status: staffData?.is_active ?? true,
      });
      setStaffId(staffData?.user_id);
    }
  }, [staffData]);

  // Fetch companies on component mount
  useEffect(() => {
    dispatch(getAllCompany());
  }, []);

  // Set companies list after fetching data
  useEffect(() => {
    if (allCompanies?.length > 0) {
      const filteredCompanies = allCompanies.filter(
        (company) => company?.status == "active"
      );
      setCompanies(filteredCompanies);
    }
  }, [allCompanies]);

  // Handle form input changes
  const handleChange = (field, value) => {
    setForm((prev) => ({...prev, [field]: value}));
  };

  // Handle form submission for creating a new staff
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {company, name, phone, email, role_id, password} = form;

    // Validation checks
    if (!company) return showError("Please select a company.");
    if (!name) return showError("Please enter staff name.");
    if (!phone) return showError("Please enter staff phone number.");
    if (!email) return showError("Please enter staff email.");
    if (
      form.role_id === "" ||
      form.role_id === undefined ||
      form.role_id === null
    ) {
      return showError("Please enter staff role.");
    }

    if (!password) return showError("Please enter staff password.");

    setLoading(true);
    try {
      // If staffId is set, it means we're updating
      if (staffId) {
        await handleUpdate();
      } else {
        // Create new staff
        await dispatch(createUser(form));
        setActiveTab("Staff List");
        showSuccess("Staff added successfully.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for updating staff data
  const handleUpdate = async () => {
    const data = await dispatch(
      updateUser({
        id: staffId,
        data: {
          company_id: form?.company,
          full_Name: form?.name,
          email: form?.email,
          password: form?.password,
          mobile: form?.phone,
          role_id: form?.role_id,
          is_active: form?.status,
        },
      })
    );

    if (data?.payload?.status === 1) {
      setForm({
        company: "",
        name: "",
        phone: "",
        email: "",
        role_id: null,
        password: "",
        status: true,
      });
      setStaffId(null);
      showSuccess("Staff updated successfully.");
      setActiveTab("Staff List");
    }
  };

  const resetForm = () => {
    setForm({
      company: "",
      name: "",
      phone: "",
      email: "",
      role_id: null,
      password: "",
      status: true,
    });
    setStaffId(null);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    resetForm();
    dispatch(clearStaffData());
  };

  return (
    <div className='w-full max-w-8xl mx-auto mt-10 shadow-lg p-8 bg-white rounded-lg'>
      <h2 className='text-2xl font-semibold text-blue-gray-700 mb-6'>
        {staffData && Object.keys(staffData) == 0
          ? "Add New Staff"
          : "Update New Staff"}
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
            value={form.role_id}
            onChange={(e) => handleChange("role_id", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            <option value=''>-- Choose Role --</option>
            <option value='0'>Admin</option>
            <option value='1'>Account</option>
            <option value='2'>Sales</option>
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

      {/* Submit Buttons */}
      <div className='pt-6 text-right'>
        <button
          type='button'
          onClick={handleCancel}
          className='bg-gray-600 mr-3 text-white px-6 py-2 rounded-md hover:bg-gray-700'
        >
          Cancel
        </button>
        <button
          type='submit'
          onClick={
            staffData && Object.keys(staffData) == 0
              ? handleSubmit
              : handleUpdate
          }
          className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700'
        >
          {staffData && Object.keys(staffData) == 0
            ? "Add Staff"
            : "Update Staff"}
        </button>
      </div>
      <div className='text-center text-sm text-green-700 italic'>
        To create a new staff please click on cancel button
      </div>
    </div>
  );
};

export default CreateStaff;
