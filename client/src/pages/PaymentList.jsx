/** @format */

import React, {useState} from "react";
import {Download, Search, Pencil} from "lucide-react";

const TABLE_HEAD = [
  "companyId",
  "invoiceId",
  "amount",
  "description",
  "amountPaid",
  "method",
];

const TABLE_ROWS = [
  {
    companyId: "COMP001",
    invoiceId: "INV1001",
    amount: 1200.0,
    description: "Monthly subscription",
    amountPaid: 1200.0,
    method: "Credit Card",
  },
  {
    companyId: "COMP002",
    invoiceId: "INV1002",
    amount: 2500.0,
    description: "Annual plan",
    amountPaid: 2000.0,
    method: "Bank Transfer",
  },
  {
    companyId: "COMP003",
    invoiceId: "INV1003",
    amount: 3750.0,
    description: "Custom service",
    amountPaid: 3750.0,
    method: "UPI",
  },
  {
    companyId: "COMP004",
    invoiceId: "INV1004",
    amount: 5000.0,
    description: "Enterprise setup fee",
    amountPaid: 4000.0,
    method: "PayPal",
  },
  {
    companyId: "COMP005",
    invoiceId: "INV1005",
    amount: 980.0,
    description: "One-time support",
    amountPaid: 980.0,
    method: "Cash",
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

export default function PaymentList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the rows based on the search query
  const filteredRows = TABLE_ROWS.filter(
    (row) =>
      row.companyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.amountPaid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='overflow-hidden rounded-lg mt-9 border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>Payment List</h2>
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
              date,
              amountPaid,
              status,
              account,
              accountNumber,
              invoiceId,
              description,
            } = row;
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 flex items-center gap-2'>
                  <span>Spotify</span>
                </td>
                <td className='p-4 text-sm'>{invoiceId}</td>
                <td className='p-4 text-sm'>{amountPaid}</td>
                <td className='p-4 text-sm'>{description}</td>
                <td className='p-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm'>{amountPaid}</span>
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
