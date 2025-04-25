/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompany} from "../redux/slice/company.slice";
import {showError, showSuccess} from "../../utils/config";
import {createUser, updateUser} from "../redux/slice/auth.slice";
import {
  clearClientData,
  createClient,
  updateClient,
} from "../redux/slice/client.slice";

const ClientCreation = ({setActiveTab}) => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.company.allCompanies);
  const clientData = useSelector((state) => state.client.singleClient);
  console.log("clientData", clientData);

  const [companies, setCompanies] = useState([]);
  const [update, setUpdate] = useState(false);
  const [clientId, setClientId] = useState(null);

  console.log("companies", companies);

  const [form, setForm] = useState({
    company_id: "",
    client_company: "",
    client_name: "",
    client_phone: "",
    client_email: "",
    client_street: "",
    client_city: "",
    client_district: "",
    client_house_no: "",
    pan_number: "",
    client_gst: "",
    pan_code: "",
    is_active: true,
  });

  console.log("form", form);

  useEffect(() => {
    if (clientData) {
      setForm((prev) => ({
        ...prev,
        client_company: clientData?.client_company || "",
        company_id: clientData?.company_id || "",
        client_name: clientData?.client_name || "",
        client_phone: clientData?.client_phone || "",
        client_email: clientData?.client_email || "",
        client_street: clientData?.client_street || "",
        client_city: clientData?.client_city || "",
        client_district: clientData?.client_district || "",
        client_house_no: clientData?.client_house_no || "",
        is_active: clientData?.is_active ?? true,
        pan_number: clientData?.pan_number || "",
        client_gst: clientData?.client_gst || "",
        pan_code: clientData?.pan_code || "",
      }));
      setClientId(clientData?.client_id);
      setUpdate(true);
    }
  }, [clientData]);

  useEffect(() => {
    dispatch(getAllCompany());
  }, []);

  useEffect(() => {
    if (allCompanies?.length > 0) {
      const filteredCompanies = allCompanies.filter(
        (company) => company?.status == "active"
      );
      setCompanies(filteredCompanies);
    }
  }, [allCompanies]);

  const handleChange = (field, value) => {
    setForm((prev) => ({...prev, [field]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company_id) {
      showError("Select company");
      return;
    } else if (!form.client_name) {
      showError("Enter Client Name");
      return;
    } else if (!form.client_email) {
      showError("Enter Client Email Address");
      return;
    } else if (!form.client_phone) {
      showError("Enter Client Phone No.");
      return;
    }

    const data = await dispatch(createClient(form));
    if (data?.payload?.success) {
      setForm((prev) => ({
        ...prev,
        client_company: "",
        company_id: "",
        client_name: "",
        client_phone: "",
        client_email: "",
        client_street: "",
        client_city: "",
        client_district: "",
        client_house_no: "",
        pan_number: "",
        client_gst: "",
        pan_code: "",
        is_active: true,
      }));
      setActiveTab("Client List");
      showSuccess("Client Created Successfully");
    } else {
      showError(data?.payload?.message);
    }
    console.log("data", data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updateClient({
        id: clientId,
        data: {
          client_company: form?.client_company || "",
          company_id: form?.company_id || "",
          client_name: form?.client_name || "",
          client_phone: form?.client_phone || "",
          client_email: form?.client_email || "",
          client_street: form?.client_street || "",
          client_city: form?.client_city || "",
          client_district: form?.client_district || "",
          client_house_no: form?.client_house_no || "",
          pan_number: form?.pan_number || "",
          client_gst: form?.client_gst || "",
          pan_code: form?.pan_code || "",
          is_active: form?.is_active ?? true,
        },
      })
    );

    console.log("data", data);

    if (data?.payload?.success) {
      setForm((prev) => ({
        ...prev,
        company_id: "",
        client_company: "",
        client_name: "",
        client_phone: "",
        client_email: "",
        client_street: "",
        client_city: "",
        client_district: "",
        client_house_no: "",
        pan_number: "",
        client_gst: "",
        pan_code: "",
        is_active: true,
      }));
      setActiveTab("Client List");
      showSuccess(data?.payload?.message);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setUpdate(false);
    setForm((prev) => ({
      ...prev,
      company_id: "",
      client_name: "",
      client_company: "",
      client_phone: "",
      client_email: "",
      client_street: "",
      client_city: "",
      pan_number: "",
      client_gst: "",
      pan_code: "",
      client_district: "",
      client_house_no: "",
      is_active: true,
    }));
    dispatch(clearClientData());
  };

  return (
    <div className='w-full max-w-8xl mx-auto mt-10 shadow-lg p-8 bg-white rounded-lg'>
      <h2 className='text-2xl font-semibold text-blue-gray-700 mb-6'>
        {clientData && Object.keys(clientData).length > 0
          ? "Update Client"
          : "Add Client"}
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
            value={form.company_id}
            onChange={(e) => handleChange("company_id", e.target.value)}
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
            Client Name
          </label>
          <input
            type='text'
            placeholder='Enter Client Name'
            value={form.client_name}
            onChange={(e) => handleChange("client_name", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Client Company Name
          </label>
          <input
            type='text'
            placeholder='Enter Customer Company Name'
            value={form.client_company}
            onChange={(e) => handleChange("client_company", e.target.value)}
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
            value={form.client_phone}
            onChange={(e) => handleChange("client_phone", e.target.value)}
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
            value={form.client_email}
            onChange={(e) => handleChange("client_email", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Pan Code
          </label>
          <input
            type='text'
            placeholder='Pan Code'
            value={form.pan_code}
            onChange={(e) => handleChange("pan_code", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Pan Number
          </label>
          <input
            type='pan_number'
            placeholder='Pan Number'
            value={form.pan_number}
            onChange={(e) => handleChange("pan_number", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            client GST
          </label>
          <input
            type='email'
            placeholder='Client GST'
            value={form.client_gst}
            onChange={(e) => handleChange("client_gst", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Password */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Street
          </label>
          <input
            type='client_street'
            placeholder='client_street'
            value={form.client_street}
            onChange={(e) => handleChange("client_street", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Role */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>City</label>
          <input
            type='client_city'
            placeholder='client_city'
            value={form.client_city}
            onChange={(e) => handleChange("client_city", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Status Toggle */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            District
          </label>
          <input
            type='client_district'
            placeholder='client_district'
            value={form.client_district}
            onChange={(e) => handleChange("client_district", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Flat No. / House No.
          </label>
          <input
            type='client_house_no'
            placeholder='client_house_no'
            value={form.client_house_no}
            onChange={(e) => handleChange("client_house_no", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>
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
                checked={form.is_active === true}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    is_active: !prev.is_active,
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
        {clientData && Object.keys(clientData).length > 0 ? (
          <button
            type='submit'
            onClick={handleUpdate}
            className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700'
          >
            Update Client
          </button>
        ) : (
          <button
            type='submit'
            onClick={handleSubmit}
            className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700'
          >
            Add Client
          </button>
        )}
      </div>
      <div className='text-center text-sm text-green-700 italic'>
        To create a new client please click on cancel button
      </div>
    </div>
  );
};

export default ClientCreation;
