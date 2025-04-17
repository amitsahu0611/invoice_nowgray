/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getUserById} from "../redux/slice/auth.slice";
import * as XLSX from "xlsx";

const TABLE_HEAD = [
  "Staff Name",
  "Company Name",
  "Phone",
  "Email",
  "Status",
  "Actions",
];

const getStatusColor = (status) => {
  switch (status) {
    case "true":
      return "text-green-600 bg-green-100";
    case "false":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function StaffList({setActiveTab}) {
  const dispatch = useDispatch();
  const allStaffs = useSelector((state) => state.auth.allStaffs);

  const [staffs, setAllStaffs] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (allStaffs.length > 0) {
      setAllStaffs(allStaffs);
    }
  }, [allStaffs]);

  console.log("staffs", staffs);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter the rows based on the search query
  const filteredRows = staffs?.filter(
    (row) =>
      row?.full_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.mobile?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = () => {
    if (staffs.length === 0) return;

    // Define the fields you want to include in the Excel file
    const exportData = staffs.map(
      ({full_Name, company_name, mobile, email, is_active}) => ({
        "Staff Name": full_Name,
        "Company Name": company_name,
        Phone: mobile,
        Email: email,
        Status: is_active ? "Active" : "Inactive",
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StaffList");

    XLSX.writeFile(workbook, "StaffList.xlsx");
  };

  const handleEdit = (id) => {
    if (id) {
      dispatch(getUserById(id));
      setActiveTab("Create Staff");
    }
  };

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>Staff List</h2>
        </div>
        <div className='flex items-center gap-4'>
          <div className='w-72'>
            <input
              type='text'
              className='w-full p-2 border border-gray-300 rounded-md'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleDownload}
            className='flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-blue-600 border-blue-600 hover:bg-blue-100'
          >
            <Download className='w-4 h-4' />
            Download
          </button>
        </div>
      </div>

      <table className='min-w-full text-left'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={index}
                className='p-4 text-sm font-medium text-gray-600 border-b bg-gray-50'
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredRows?.map((row, index) => {
            const {
              company_name,
              email,
              full_Name,
              is_active,
              mobile,
              company_id,
            } = row;
            console.log("is_active", is_active);
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 flex items-center gap-2'>
                  <span>{full_Name}</span>
                </td>
                <td className='p-4 text-sm'>{company_name}</td>
                <td className='p-4 text-sm'>{mobile}</td>
                <td className='p-4 text-sm'>{email}</td>
                <td className='p-4 text-sm'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      is_active
                    )}`}
                  >
                    {is_active === true ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className='p-4 text-sm'>
                  <button
                    onClick={() => handleEdit(company_id)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    <Pencil className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
