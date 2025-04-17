/** @format */

import React, {useState} from "react";
import Topbar from "../component/Topbar";
import CreateCompany from "./CreateCompany";
import CompanyList from "./CompanyList";

const Company = () => {
  const [activeTab, setActiveTab] = useState("Create Company");

  const tabs = [
    {
      label: "Create Company",
      content: <CreateCompany setActiveTab={setActiveTab} />,
    },
    {
      label: "Company List",
      content: <CompanyList setActiveTab={setActiveTab} />,
    },
  ];

  return (
    <div>
      <div>
        <Topbar name='Company' />
        <div className='w-full rounded-lg shadow-sm'>
          {/* Tab Headers */}
          <div className='flex gap-2 border-b px-4 pt-4'>
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-2 rounded-t-lg w-[150px] text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.label
                    ? "bg-gray-500 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className='p-4 text-sm text-gray-700'>
            {tabs.find((tab) => tab.label === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
