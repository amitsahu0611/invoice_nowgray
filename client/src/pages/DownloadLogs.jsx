/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getUserById} from "../redux/slice/auth.slice";
import * as XLSX from "xlsx";
import {allDownloadLog} from "../redux/slice/reports.slice";

const TABLE_HEAD = [
  "S.No",
  "Document Type",
  "Document Number",
  "Downloaded By",
  "Downloaded At",
  "Role",
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

export default function DownloadLogs({setActiveTab}) {
  const dispatch = useDispatch();
  const allLogs = useSelector((state) => state.report.downloadLogs);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    dispatch(allDownloadLog());
  }, []);

  useEffect(() => {
    if (allLogs?.length > 0) {
      setLogs(allLogs);
    }
  }, [allLogs]);

  console.log("logs", logs);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter the rows based on the search query
  const filteredRows = logs?.filter((row) => {
    const role = (r) => {
      if (r == 1) return "Admin";
      if (r == 2) return "Sales";
      if (r == 3) return "Accounts";
      return "";
    };

    const query = searchQuery.toLowerCase();

    return (
      row?.type?.toLowerCase().includes(query) ||
      row?.documentNumber?.toLowerCase().includes(query) ||
      row?.downloaderName?.toLowerCase().includes(query) ||
      (row?.downloadedAt &&
        new Date(row.downloadedAt)
          .toLocaleString()
          .toLowerCase()
          .includes(query)) ||
      role(row?.downloaderRole).toLowerCase().includes(query)
    );
  });

  const handleDownload = () => {
    if (logs.length === 0) return;

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
            const role = (role) => {
              if (role == 1) {
                return "Admin";
              } else if (role == 2) {
                return "Sales";
              } else if (role == 3) {
                return "Accounts";
              }
            };
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 text-sm'>{index + 1}</td>
                <td className='p-4 text-sm'>{row?.type}</td>
                <td className='p-4 text-sm'>{row?.documentNumber}</td>
                <td className='p-4 text-sm'>{row?.downloaderName}</td>
                <td className='p-4 text-sm'>{row?.downloadedAt}</td>
                <td className='p-4 text-sm'>{role(row?.downloaderRole)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
