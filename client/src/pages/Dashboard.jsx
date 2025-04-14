/** @format */

import React from "react";
import {Routes, Route} from "react-router-dom";
import Quotation from "./Quotation";
import Invoices from "./Invoices";
import Users from "./Users";
import Reports from "./Reports";
import SettingsPage from "./SettingsPage";
import Company from "./Company";
import Sidebar from "../component/Sidebar";
import Staff from "./Staff";
import DashboardContent from "./DashboardContent";
import Payments from "./Payments";

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='ml-[320px] p-6 w-full'>
        {/* Add a Routes component here to render the content */}
        <Routes>
          <Route path='/' element={<DashboardContent />} />
          <Route path='/quotations' element={<Quotation />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='/users' element={<Users />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/company' element={<Company />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
