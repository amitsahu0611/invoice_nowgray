/** @format */
import React, {useEffect} from "react";
import SalesChart from "../component/SalesChart";
import PieChart from "../component/PieChart";
import Topbar from "../component/Topbar";
import {getMonthlyPaymentSummary} from "../redux/slice/payment.slice";
import {useDispatch, useSelector} from "react-redux";

const TABLE_HEAD = ["Number", "Customer", "Amount", "Issued", "Payment Date"];

const DashboardContent = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.payment.dashboardData);
  console.log("dashboard", dashboardData);

  useEffect(() => {
    dispatch(getMonthlyPaymentSummary());
  }, []);

  const {
    allQuotation = 0,
    allInvoices = 0,
    approvedInvoice = 0,
    invoiceDownloaded = 0,
    allUsers = 0,
  } = dashboardData?.data || {};

  const tableRows =
    dashboardData?.allPayments?.map((item, index) => ({
      number: item.invoice_no || `#${index + 1}`,
      customer: item.customer_name || "-",
      amount: `₹${item.total_amount}`,
      issued: item.issue_date,
      date: item.due_date,
    })) || [];

  return (
    <div className='w-full'>
      <Topbar name={"Dashboard"} />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6'>
        <div className='bg-purple-100 text-purple-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>{allQuotation}</span>
          <span className='text-sm'>Quotation Made</span>
        </div>

        <div className='bg-blue-100 text-blue-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>{allInvoices}</span>
          <span className='text-sm'>Invoice Made</span>
        </div>

        <div className='bg-green-100 text-green-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>{approvedInvoice}</span>
          <span className='text-sm'>Invoice Approved</span>
        </div>

        <div className='bg-yellow-100 text-yellow-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>{invoiceDownloaded}</span>
          <span className='text-sm'>Invoice Downloaded</span>
        </div>

        <div className='bg-pink-100 text-pink-800 rounded-xl px-4 py-2 shadow-sm flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold'>{allUsers}</span>
          <span className='text-sm'>No. of Staffs</span>
        </div>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 p-4 items-stretch'>
        <div className='w-full md:basis-1/2 h-[400px]'>
          <SalesChart data={dashboardData?.monthlyData || []} />
        </div>
        <div className='w-full md:basis-1/2 h-[400px]'>
          <PieChart
            allQuotation={dashboardData?.data?.allQuotation || 0}
            allInvoices={dashboardData?.data?.allInvoices || 0}
            approvedInvoice={dashboardData?.data?.approvedInvoice || 0}
            invoiceDownloaded={dashboardData?.data?.invoiceDownloaded || 0}
          />
        </div>
      </div>

      {/* Table */}
      <div className='p-6'>
        <div className='overflow-x-auto bg-white shadow rounded-lg'>
          <table className='w-full table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='p-4 pt-6 border-b'>
                    <span className='text-sm font-bold text-gray-700'>
                      {head}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-sm text-gray-600'>
              {tableRows.map(({number, customer, amount, issued, date}) => (
                <tr key={number} className='hover:bg-gray-50'>
                  <td className='p-4 font-semibold'>{number}</td>
                  <td className='p-4 text-gray-600'>{customer}</td>
                  <td className='p-4 text-gray-600'>{amount}</td>
                  <td className='p-4 text-gray-600'>{issued}</td>
                  <td className='p-4 text-gray-600'>{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
