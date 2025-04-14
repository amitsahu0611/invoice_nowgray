/** @format */

import React from "react";
import {ArrowRight} from "lucide-react";

const SelectCompany = () => {
  const companies = [
    {
      id: 1,
      name: "Ecommm 11",
      logo: "../../public/logo/ecomm.png", // Replace with your actual logo
    },
    {
      id: 2,
      name: "Nowgray IT services",
      logo: "../../public/logo/Nowgray.png",
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4'>
      <div className='w-full max-w-lg space-y-6'>
        {/* <h2 className='text-2xl font-bold text-gray-700 text-center'>
          Select a Company
        </h2> */}
        {companies.map((company) => (
          <div
            key={company.id}
            className='flex items-center justify-between bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300'
          >
            <div className='flex items-center space-x-4'>
              <img
                src={company.logo}
                alt={company.name}
                className='w-16 h-16 object-cover rounded-md border'
              />
              <span className='text-lg font-medium text-gray-800'>
                {company.name}
              </span>
            </div>
            <button className='flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200'>
              <span>Select</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCompany;
