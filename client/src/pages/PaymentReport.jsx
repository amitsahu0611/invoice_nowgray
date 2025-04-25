/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil, Eye} from "lucide-react";
import {
  approveQuotation,
  getAllQuotations,
  getQuotationById,
} from "../redux/slice/quotation.slice";
import {useDispatch, useSelector} from "react-redux";
import InvoiceTemplate1 from "../../template/InvoiceTemplate1";
import * as XLSX from "xlsx";
import {getUserData, showError, showSuccess} from "../../utils/config";
import {getPaymentReport} from "../redux/slice/reports.slice";

const TABLE_HEAD = [
  "S.No",
  "Invoice ID",
  "Company",
  "Total Amount",
  "Total Amount Paid",
  "Left Amount",
  // "No of Payments",
  "Status",
  "Sales Person",
];

const getStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function PaymentReport({setActiveTab}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setAllReports] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      console.log("data", data);
      setUserData(data);
    };

    fetchData();
  }, []);

  const paymentReports = useSelector((state) => state.report.paymentReport);

  useEffect(() => {
    if (paymentReports?.length > 0) {
      setAllReports(paymentReports);
    }
  }, [paymentReports]);

  console.log("reports", reports);
  useEffect(() => {
    dispatch(getAllQuotations());
  }, []);

  useEffect(() => {
    dispatch(getPaymentReport());
  }, []);

  const filteredRows = reports?.filter((row) => {
    const query = searchQuery.toLowerCase();

    return (
      row?.amount?.toString().toLowerCase().includes(query) ||
      row?.amountPaid?.toString().toLowerCase().includes(query) ||
      row?.companyName?.toLowerCase().includes(query) ||
      row?.totalAmountPaidForInvoices
        ?.toString()
        .toLowerCase()
        .includes(query) ||
      row?.username?.toLowerCase().includes(query) ||
      row?.total_amount?.toString().toLowerCase().includes(query)
    );
  });
  console.log("filteredRows", filteredRows);

  const handleExport = () => {
    if (paymentReports?.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(paymentReports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "paymentReports");

    XLSX.writeFile(workbook, "Payment Reports.xlsx");
  };

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>
            Invoices Report
          </h2>
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
          <button
            onClick={handleExport}
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
          {filteredRows?.map((quote, index) => {
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 text-sm'>{index + 1}</td>
                <td className='p-4 text-sm'>{quote?.invoiceId}</td>
                <td className='p-4 text-sm'>{quote?.companyName}</td>
                <td className='p-4 text-sm'>{quote?.amount}</td>
                <td className='p-4 text-sm'>
                  {quote?.totalAmountPaidForInvoice}
                </td>
                <td className='p-4 text-sm'>{quote?.leftAmount}</td>
                {/* <td className='p-4 text-sm'>₹{quote?.amount}</td> */}
                <td className='p-4 text-sm'>{"-"}</td>
                <td className='p-4 text-sm'>{quote?.username}</td>
              </tr>
            );
          })}
          {filteredRows?.length === 0 && (
            <tr>
              <td colSpan={11} className='p-4 text-center text-gray-500'>
                No Report found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
