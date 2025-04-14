/** @format */

import React from "react";

import SalesChart from "../component/SalesChart";
import PieChart from "../component/PieChart";
import Topbar from "../component/Topbar";

const TABLE_HEAD = ["Number", "Customer", "Amount", "Issued", "Payment Date"];

const TABLE_ROWS = [
  {
    number: "#MS-415646",
    customer: "CompanyINC",
    amount: "$14,000",
    issued: "31 Jan 2024",
    date: "31 Feb 2024",
  },
  {
    number: "#MS-415647",
    customer: "CompanyINC",
    amount: "$4,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#MS-415648",
    customer: "CompanyINC",
    amount: "$11,000",
    issued: "12 Jan 2024",
    date: "12 Feb 2024",
  },
  {
    number: "#MS-415649",
    customer: "CompanyINC",
    amount: "$2,600",
    issued: "10 Jan 2024",
    date: "10 Feb 2024",
  },
];

const DashboardContent = () => {
  return (
    <div className='w-full'>
      <Topbar name={"Dashboard"} />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6'>
        <div className='bg-purple-100 text-purple-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>5</span>
          <span className='text-sm'>Quotation Made</span>
        </div>

        <div className='bg-blue-100 text-blue-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>4</span>
          <span className='text-sm'>Invoice Made</span>
        </div>

        <div className='bg-green-100 text-green-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>3</span>
          <span className='text-sm'>Invoice Approved</span>
        </div>

        <div className='bg-yellow-100 text-yellow-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>2</span>
          <span className='text-sm'>Invoice Downloaded</span>
        </div>

        <div className='bg-pink-100 text-pink-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>10</span>
          <span className='text-sm'>No. of Staffs</span>
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 p-4 items-stretch'>
        <div className='w-full md:basis-1/2 h-[400px]'>
          <SalesChart />
        </div>
        <div className='w-full md:basis-1/2 h-[400px]'>
          <PieChart />
        </div>
      </div>

      {/* Table */}
      <div className='p-6'>
        <div className='overflow-x-auto bg-white shadow rounded-lg'>
          <table className='w-full table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='p-4 pt-6 border-b'>
                    <span className='text-sm font-bold text-gray-700'>
                      {head}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-sm text-gray-600'>
              {TABLE_ROWS.map(({number, customer, amount, issued, date}) => (
                <tr key={number} className='hover:bg-gray-50'>
                  <td className='p-4 font-semibold'>{number}</td>
                  <td className='p-4 text-gray-600'>{customer}</td>
                  <td className='p-4 text-gray-600'>{amount}</td>
                  <td className='p-4 text-gray-600'>{issued}</td>
                  <td className='p-4 text-gray-600'>{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
