/** @format */

import React, {useState} from "react";
import {showError} from "../../utils/config";
import {createCompany} from "../redux/slice/company.slice";
import {useDispatch} from "react-redux";

const CreateCompany = ({onSubmit}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    color: "#000000", // Default color
    bgColor: "#FFFFFF", // Default background color
    phone: "",
    address: "",
    gst: "",
    website: "",
    status: "active",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({...prev, [field]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, phone, address, website} = form;
    console.log("form", form);
    if (name && email && phone && address && website) {
      await dispatch(createCompany(form));
    } else {
      showError("Please fill all the fields.");
    }
  };

  return (
    <div className='w-full max-w-8xl mx-auto mt-10 shadow-lg p-8 bg-white rounded-lg'>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {/* Company Name */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Company Name
          </label>
          <input
            type='text'
            placeholder='Enter Company Name'
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Company Email */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            placeholder='Enter Company Email'
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Company Phone */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Phone
          </label>
          <input
            type='tel'
            placeholder='Company Phone Number'
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Company Address */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Address
          </label>
          <input
            type='text'
            placeholder='Company Address'
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Company GST */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            GST Number
          </label>
          <input
            type='text'
            placeholder='GST Number'
            value={form.gst}
            onChange={(e) => handleChange("gst", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Company Website */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Website URL
          </label>
          <input
            type='url'
            placeholder='Website URL'
            value={form.website}
            onChange={(e) => handleChange("website", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Company Color */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Company Color
          </label>
          <div className='flex items-center space-x-4'>
            <input
              type='color'
              value={form.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className='border border-gray-300 rounded-md px-3 py-2'
            />
            <div
              style={{backgroundColor: form.color}}
              className='w-8 h-8 rounded-full border border-gray-300'
            ></div>
          </div>
        </div>

        {/* Company Background Color */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Background Color
          </label>
          <div className='flex items-center space-x-4'>
            <input
              type='color'
              value={form.bgColor}
              onChange={(e) => handleChange("bgColor", e.target.value)}
              className='border border-gray-300 rounded-md px-3 py-2'
            />
            <div
              style={{backgroundColor: form.bgColor}}
              className='w-8 h-8 rounded-full border border-gray-300'
            ></div>
          </div>
        </div>

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
          Add Company
        </button>
      </div>
    </div>
  );
};

export default CreateCompany;
