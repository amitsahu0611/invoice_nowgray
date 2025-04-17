/** @format */

import React from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  Settings,
  BarChart2,
  LogOut,
  File,
} from "lucide-react";
import {Link} from "react-router-dom"; // Import Link for navigation

const Sidebar = () => {
  const logout = () => {
    localStorage.clear(); // Clear local storage
    window.location.href = "/"; // Redirect to the homepage or login page
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-[320px] bg-white shadow-lg p-4 flex flex-col justify-between z-50'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-2 mb-6 p-2 mx-auto'>
          <FileText className='w-6 h-6 text-blue-600' />
          <span className='text-xl font-bold text-gray-800 cursor-pointer'>
            <Link to='/dashboard'>Invoice</Link>
          </span>
        </div>

        <div className='space-y-2'>
          <Link
            to='/dashboard'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to='/dashboard/quotations'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <FileText size={20} />
            Quotations
          </Link>

          <Link
            to='/dashboard/invoices'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <FileText size={20} />
            Invoices
          </Link>

          <Link
            to='/dashboard/staff'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <Users size={20} />
            Manage Staff
          </Link>

          <Link
            to='/dashboard/reports'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <BarChart2 size={20} />
            Reports
          </Link>

          <Link
            to='/dashboard/payments'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <Settings size={20} />
            Payments
          </Link>

          <Link
            to='/dashboard/company'
            className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
          >
            <File size={20} />
            Company
          </Link>

          {/* Log Out */}
          <div
            onClick={logout}
            className='flex items-center gap-3 px-3 py-2 hover:bg-red-100 rounded-lg cursor-pointer text-red-600 font-medium'
          >
            <LogOut size={20} />
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
