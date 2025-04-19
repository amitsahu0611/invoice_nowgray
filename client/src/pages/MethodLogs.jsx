/** @format */

import React, {useEffect, useState} from "react";
import {Download, Info} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import * as XLSX from "xlsx";
import {getAllMethodLogs} from "../redux/slice/reports.slice";

const TABLE_HEAD = ["S.No", "Method", "Route", "Requested Data", "Timestamp"];

export default function MethodLogs({setActiveTab}) {
  const dispatch = useDispatch();
  const allLogs = useSelector((state) => state.report.methodLogs);

  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    dispatch(getAllMethodLogs());
  }, []);

  useEffect(() => {
    if (allLogs?.length > 0) {
      setLogs(allLogs);
    }
  }, [allLogs]);

  const filteredRows = logs?.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row?.method?.toLowerCase().includes(query) ||
      row?.route?.toLowerCase().includes(query) ||
      row?.requestData?.toLowerCase().includes(query) ||
      (row?.timestamp &&
        new Date(row.timestamp).toLocaleString().toLowerCase().includes(query))
    );
  });

  const handleDownload = () => {
    if (logs.length === 0) return;

    const exportData = logs.map(({method, route, requestData, timestamp}) => ({
      Method: method,
      Route: route,
      "Requested Data": requestData,
      Timestamp: new Date(timestamp).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MethodLogs");

    XLSX.writeFile(workbook, "MethodLogs.xlsx");
  };

  const handleCloseModal = () => {
    setSelectedData(null);
  };

  const parseJSONSafely = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  };

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <h2 className='text-lg font-semibold text-gray-700'>Method Logs</h2>
        <div className='flex items-center gap-4'>
          <input
            type='text'
            className='w-72 p-2 border border-gray-300 rounded-md'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleDownload}
            className='flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-blue-600 border-blue-600 hover:bg-blue-100'
          >
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
          {filteredRows.map((row, index) => (
            <tr key={index} className='border-b'>
              <td className='p-4 text-sm'>{index + 1}</td>
              <td className='p-4 text-sm'>{row?.method}</td>
              <td className='p-4 text-sm'>{row?.route}</td>
              <td className='p-4 text-sm'>
                <button
                  className='text-blue-600 hover:text-blue-800 flex items-center gap-1'
                  onClick={() => setSelectedData(row?.requestData)}
                  title='View Request Data'
                >
                  <Info className='w-4 h-4' />
                  View
                </button>
              </td>
              <td className='p-4 text-sm'>
                {new Date(row?.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedData && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
          <div className='bg-white rounded-lg p-6 max-w-lg w-full shadow-lg'>
            <h3 className='text-lg font-semibold mb-4'>Request Data</h3>
            <pre className='text-sm bg-gray-100 p-3 rounded overflow-auto max-h-96'>
              {JSON.stringify(parseJSONSafely(selectedData), null, 2)}
            </pre>
            <div className='mt-4 text-right'>
              <button
                onClick={handleCloseModal}
                className='px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
