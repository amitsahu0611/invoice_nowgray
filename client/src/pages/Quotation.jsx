/** @format */

import React, {useState} from "react";
import Topbar from "../component/Topbar";
import Tabs from "../component/Tabs";
import QuotationList from "./QuotationList";
import QuotationForm from "./QuotationForm";

const Quotation = () => {
  const [activeTab, setActiveTab] = useState("Create Quotation");

  const tabs = [
    {
      label: "Create Quotation",
      content: <QuotationForm setActiveTab={setActiveTab} />,
    },
    {
      label: "Quotation List",
      content: <QuotationList setActiveTab={setActiveTab} />,
    },
  ];

  return (
    <div>
      <div>
        <Topbar name='Quotation' />
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

export default Quotation;
