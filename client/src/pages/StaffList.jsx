/** @format */

import React, {useState} from "react";
import {Download, Search, Pencil} from "lucide-react";

const TABLE_HEAD = [
  "Staff Name",
  "Company Name",
  "Phone",
  "Email",
  "Role",
  "Actions",
];

const TABLE_ROWS = [
  {
    icon: "Spotify", // Add icons from lucide-react
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    icon: "Amazon",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    icon: "Pinterest",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    icon: "Google",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    icon: "Netflix",
    name: "Netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function StaffList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the rows based on the search query
  const filteredRows = TABLE_ROWS.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.account.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button className='flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-blue-600 border-blue-600 hover:bg-blue-100'>
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
          {filteredRows.map((row, index) => {
            const {
              name,
              amount,
              date,
              status,
              account,
              accountNumber,
              expiry,
              icon,
            } = row;
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 flex items-center gap-2'>
                  <span>{name}</span>
                </td>
                <td className='p-4 text-sm'>{amount}</td>
                <td className='p-4 text-sm'>{date}</td>
                <td className='p-4 text-sm'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </td>
                <td className='p-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm'>
                      {account} {accountNumber}
                    </span>
                  </div>
                </td>
                <td className='p-4 text-sm'>
                  <button className='text-blue-600 hover:text-blue-800'>
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
