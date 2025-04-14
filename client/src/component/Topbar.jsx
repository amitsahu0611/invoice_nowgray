/** @format */

import React, {useEffect, useState} from "react";
import {Bell} from "lucide-react";

const Topbar = ({name}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [topBar, setTopBar] = useState(null);

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const dummyNotifications = [
    "New invoice created",
    "User John updated profile",
    "System maintenance scheduled",
  ];

  useEffect(() => {
    const pathSegments = window.location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    const lastSegment =
      pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "/";

    console.log("lastSegment", lastSegment);
    setTopBar(lastSegment);
  }, []);

  return (
    <div>
      <div className='w-full bg-white shadow px-6 py-3 flex justify-between items-center'>
        <div className='text-xl font-semibold text-gray-700'>{name}</div>

        {topBar === "dashboard" && (
          <div className='flex items-center gap-4 relative'>
            {/* Notifications */}
            <div className='relative'>
              <button
                onClick={() => toggleDropdown("notifications")}
                className='relative p-2 hover:bg-gray-100 rounded-full'
              >
                <Bell className='w-5 h-5 text-gray-600' />
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                  3
                </span>
              </button>

              {openDropdown === "notifications" && (
                <div className='absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50'>
                  <div className='p-3 border-b font-medium text-gray-700'>
                    Notifications
                  </div>
                  <ul className='text-sm max-h-48 overflow-y-auto'>
                    {dummyNotifications.map((note, idx) => (
                      <li
                        key={idx}
                        className='px-4 py-2 hover:bg-gray-50 text-gray-600'
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {topBar === "quotations" && (
          <button className='text-black font-semibold px-4 py-1 rounded border border-black shadow transition duration-300 hover:bg-gray-600 hover:text-white'>
            Create Quotation
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
