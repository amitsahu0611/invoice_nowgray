/** @format */

import React, {useEffect, useState} from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  User,
  Settings,
  BarChart2,
  LogOut,
  File,
  CheckCircle2,
  ClipboardList,
  ReceiptText,
  Contact2,
  BadgeCheck,
  ScrollText,
} from "lucide-react";
import {Link} from "react-router-dom"; // Import Link for navigation
import {getUserData} from "../../utils/config";

const Sidebar = () => {
  const logout = () => {
    localStorage.clear(); // Clear local storage
    window.location.href = "/"; // Redirect to the homepage or login page
  };

  const [userData, setUserData] = useState({});
  const [role_id, setRoleId] = useState();

  const {full_Name} = userData;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      console.log("data", data);
      setUserData(data);
      setRoleId(data.role_id);
    };

    fetchData();
  }, []);

  console.log("role_id", role_id);

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

          {(role_id == 0 || role_id == 2) && (
            <>
              <Link
                to='/dashboard/quotations'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <FileText size={20} />
                Quotations
              </Link>
            </>
          )}

          {(role_id == 0 || role_id == 2) && (
            <>
              <Link
                to='/dashboard/invoices'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <ReceiptText size={20} />
                Invoices
              </Link>
            </>
          )}

          {role_id == 0 && (
            <>
              <Link
                to='/dashboard/staff'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <Users size={20} />
                Manage Staff
              </Link>
            </>
          )}

          {(role_id == 0 || role_id == 2) && (
            <>
              <Link
                to='/dashboard/client'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <Contact2 size={20} />
                Client
              </Link>
            </>
          )}

          {role_id == 0 && (
            <>
              <Link
                to='/dashboard/reports'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <BarChart2 size={20} />
                Reports
              </Link>
            </>
          )}

          {(role_id == 0 || role_id == 2) && (
            <>
              <Link
                to='/dashboard/payments'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <Settings size={20} />
                Payments
              </Link>
            </>
          )}

          {(role_id == 0 || role_id == 1) && (
            <>
              <Link
                to='/dashboard/approvePayment'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <BadgeCheck size={20} />
                Approve Payment
              </Link>
            </>
          )}

          {role_id == 0 && (
            <>
              <Link
                to='/dashboard/company'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <File size={20} />
                Company
              </Link>
            </>
          )}

          {role_id == 0 && (
            <>
              <Link
                to='/dashboard/log'
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-700'
              >
                <ScrollText size={20} />
                Log
              </Link>
            </>
          )}

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
      <div>
        <span className='block text-center text-lg text-gray-700 pb-2'>
          👋 Hello, {full_Name}!
        </span>
        <span className='block text-center text-sm text-gray-500 mt-1 border-t pt-3'>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
