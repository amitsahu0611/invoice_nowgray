/** @format */

import React, {useState} from "react";
import {Download, Search, Pencil} from "lucide-react";

const TABLE_HEAD = [
  "Company Name",
  "Email",
  "Phone",
  "Status",
  "Currency",
  "Actions",
];

const TABLE_ROWS = [
  {
    name: "Spotify",
    email: "contact@spotify.com",
    phone: "+1 234 567 890",
    status: "active",
    currency: "USD",
  },
  {
    name: "Amazon",
    email: "contact@amazon.com",
    phone: "+1 234 567 891",
    status: "active",
    currency: "USD",
  },
  {
    name: "Pinterest",
    email: "contact@pinterest.com",
    phone: "+1 234 567 892",
    status: "inactive",
    currency: "USD",
  },
  {
    name: "Google",
    email: "contact@google.com",
    phone: "+1 234 567 893",
    status: "active",
    currency: "USD",
  },
  {
    name: "Netflix",
    email: "contact@netflix.com",
    phone: "+1 234 567 894",
    status: "inactive",
    currency: "USD",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function CompanyList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the rows based on the search query
  const filteredRows = TABLE_ROWS.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='overflow-hidden rounded-lg mt-9 border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>Company List</h2>
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
            const {name, email, phone, status, currency} = row;
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 text-sm'>{name}</td>
                <td className='p-4 text-sm'>{email}</td>
                <td className='p-4 text-sm'>{phone}</td>
                <td className='p-4 text-sm'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </td>
                <td className='p-4 text-sm'>{currency}</td>
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
