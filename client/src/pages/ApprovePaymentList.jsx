/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, getUserById} from "../redux/slice/auth.slice";
import * as XLSX from "xlsx";
import {approvePayment, getAllPayment} from "../redux/slice/payment.slice";
import {formatDate, getUserData, showSuccess} from "../../utils/config";

const TABLE_HEAD = [
  "S. No",
  "Invoice Id",
  "Amount Paid",
  "Method",
  "Payment Date",
  "Payment Created By",
  "Actions",
];

const getStatusColor = (status) => {
  switch (status) {
    case "true":
      return "text-green-600 bg-green-100";
    case "false":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function ApprovePaymentList({setActiveTab}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allPayments = useSelector((state) => state.payment.allPayments);

  useEffect(() => {
    dispatch(getAllPayment(currentPage));
  }, [currentPage]);

  const [userData, setUserData] = useState({});

  console.log("userData", userData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      console.log("data", data);
      setUserData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allPayments?.length > 0) {
      setPayments(allPayments);
    }
  }, [allPayments]);

  console.log("payments", payments);

  const handleVerifyClick = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleConfirmVerification = async () => {
    const data = await dispatch(
      approvePayment({
        payment_id: selectedPayment?.payment_id,
        approvedBy: userData?.user_id,
      })
    );
    if (data?.payload?.status == 1) {
      showSuccess(data?.payload?.message);
      dispatch(getAllPayment());
      setSelectedPayment(null);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const filteredRows = payments?.filter(
    (row) =>
      row?.full_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.mobile?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleDownload = () => {
  //   if (staffs.length === 0) return;

  //   // Define the fields you want to include in the Excel file
  //   const exportData = staffs.map(
  //     ({full_Name, company_name, mobile, email, is_active}) => ({
  //       "Staff Name": full_Name,
  //       "Company Name": company_name,
  //       Phone: mobile,
  //       Email: email,
  //       Status: is_active ? "Active" : "Inactive",
  //     })
  //   );

  //   const worksheet = XLSX.utils.json_to_sheet(exportData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "StaffList");

  //   XLSX.writeFile(workbook, "StaffList.xlsx");
  // };

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>
            Approve Payments
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
            // onClick={handleDownload}
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
          {payments?.map((row, index) => {
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 flex items-center gap-2'>
                  <span>{index + 1}</span>
                </td>
                <td className='p-4 text-sm'>{row?.invoiceId}</td>
                <td className='p-4 text-sm'>{row?.amountPaid}</td>
                <td className='p-4 text-sm'>{row?.method}</td>
                <td className='p-4 text-sm'>{formatDate(row?.createdAt)}</td>
                <td className='p-4 text-sm'>{row?.username}</td>
                <td className='p-4 text-sm'>
                  <button
                    className={`text-white px-4 py-1 ${
                      row?.approvedBy != null ? "bg-gray-400" : "bg-green-700"
                    }`}
                    disabled={row?.approvedBy != null}
                    onClick={() => handleVerifyClick(row)}
                  >
                    {row?.approvedBy != null ? "Verified" : "Verify"}
                  </button>
                </td>
              </tr>
            );
          })}

          {payments?.length === 0 && (
            <tr>
              <td colSpan={11} className='p-4 text-center text-gray-500'>
                No Payment found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-center items-center p-4 border-t bg-white'>
        <div className='flex items-center space-x-2'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 text-sm rounded transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>
          <button className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded shadow'>
            {currentPage}
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className='px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition'
          >
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <h3 className='text-lg font-semibold mb-4'>Verify Payment</h3>
            <p className='mb-4 text-gray-700'>
              Have you verified this payment? <br />
              <strong className='text-red-600'>
                This action is irreversible.
              </strong>
            </p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={handleCloseModal}
                className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmVerification()}
                className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'
              >
                Yes, Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
