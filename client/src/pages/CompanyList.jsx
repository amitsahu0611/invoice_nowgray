/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompany, getCompanyById} from "../redux/slice/company.slice";
import {setActive} from "@material-tailwind/react/components/Tabs/TabsContext";

const TABLE_HEAD = [
  "Sr. No.",
  "Company Name",
  "Company Email",
  "Company Phone",
  "Status",
  "Actions",
];

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "text-green-600 bg-green-100";
    case "inactive":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function CompanyList({setActiveTab}) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);

  const companies = useSelector((state) => state.company.allCompanies);
  console.log("allCompanies", allCompanies);

  useEffect(() => {
    dispatch(getAllCompany());
  }, []);

  useEffect(() => {
    if (companies?.length > 0) {
      setAllCompanies(companies);
    }
  }, [companies]);

  // Filter the rows based on the search query
  const filteredRows = allCompanies?.filter(
    (row) =>
      row.company_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.company_phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.website?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id) => {
    if (id) {
      dispatch(getCompanyById(id));
      setActiveTab("Create Company");
    }
  };

  return (
    <div className='overflow-hidden rounded-lg mt-9 border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>Company List</h2>
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
          {filteredRows?.map((row, index) => {
            const {
              company_email,
              company_name,
              company_phone,
              status,
              company_id,
            } = row;
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 text-sm'>{index + 1}</td>
                <td className='p-4 text-sm'>{company_name}</td>
                <td className='p-4 text-sm'>{company_email}</td>
                <td className='p-4 text-sm'>{company_phone}</td>
                <td className='p-4 text-sm'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </td>
                <td className='p-4 text-sm'>
                  <button
                    onClick={() => handleEdit(company_id)}
                    className='text-blue-600 hover:text-blue-800'
                  >
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
