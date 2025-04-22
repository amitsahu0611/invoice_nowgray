/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getUserById} from "../redux/slice/auth.slice";
import * as XLSX from "xlsx";
import {getAllClients, getClientById} from "../redux/slice/client.slice";

const TABLE_HEAD = [
  "S.No",
  "Client Name",
  "Email",
  "Phone",
  "Company",
  "City",
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

export default function ClientList({setActiveTab}) {
  const dispatch = useDispatch();
  const allClients = useSelector((state) => state.client.allClients);
  console.log("allClients", allClients);

  const [clients, setAllClients] = useState([]);

  useEffect(() => {
    dispatch(getAllClients());
  }, []);

  useEffect(() => {
    if (allClients?.length > 0) {
      setAllClients(allClients);
    }
  }, [allClients]);

  console.log("allClients", allClients);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = clients?.filter(
    (row) =>
      row?.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.client_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.client_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      dispatch(getClientById(id));
      setActiveTab("Create Client");
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
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 flex items-center gap-2'>
                  <span>{index + 1}</span>
                </td>
                <td className='p-4 text-sm'>{row?.client_name}</td>
                <td className='p-4 text-sm'>{row?.client_email}</td>
                <td className='p-4 text-sm'>{row?.client_phone}</td>
                <td className='p-4 text-sm'>{row?.company_name}</td>
                <td className='p-4 text-sm'>{row?.client_city}</td>

                <td className='p-4 text-sm'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      row?.is_active
                    )}`}
                  >
                    {row?.is_active === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className='p-4 text-sm'>
                  <button
                    onClick={() => handleEdit(row?.client_id)}
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
