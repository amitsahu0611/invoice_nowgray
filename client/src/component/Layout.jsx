/** @format */

// components/Layout.jsx
import React from "react";
import {Sidebar} from "./Sidebar";

const Layout = ({children}) => {
  return (
    <div className='flex min-h-screen'>
      <aside className='w-64 bg-gray-100'>
        <Sidebar />
      </aside>
      <main className='flex-1 p-4 bg-white'>{children}</main>
    </div>
  );
};

export default Layout;
