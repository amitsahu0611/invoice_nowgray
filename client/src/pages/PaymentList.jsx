/** @format */

import React, {useEffect, useState} from "react";
import {Download, Search, Pencil} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {getAllPayment, getPaymentById} from "../redux/slice/payment.slice";
import {formatDate} from "../../utils/config";

const TABLE_HEAD = [
  "S.No",
  "Invoice Id",
  "Payment Id",
  "Company Name",
  "Amount",
  "Amount Paid",
  "Payment Method",
  "Payment Date",
  "Payment Status",
  "Created By",
  "Approved By",
  "Action",
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

export default function PaymentList({setActiveTab}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState([]);
  console.log("payments", payments);

  const allPayments = useSelector((state) => state.payment.allPayments);

  useEffect(() => {
    dispatch(getAllPayment());
  }, []);

  useEffect(() => {
    if (allPayments?.length > 0) {
      setPayments(allPayments);
    }
  }, [allPayments]);

  // Filter the rows based on the search query
  const filteredRows = payments?.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row?.companyName?.toLowerCase().includes(query) ||
      row?.invoiceId?.toString().toLowerCase().includes(query) ||
      row?.payment_id?.toString().toLowerCase().includes(query) ||
      row?.amount?.toString().toLowerCase().includes(query) ||
      row?.amountPaid?.toString().toLowerCase().includes(query) ||
      row?.method?.toLowerCase().includes(query) ||
      row?.username?.toLowerCase().includes(query) ||
      formatDate(row?.createdAt)?.toLowerCase().includes(query)
    );
  });

  const handleEdit = async (id) => {
    if (id) {
      const data = await dispatch(getPaymentById(id));
      console.log("data", data);
      if (data?.payload?.status === 1) {
        setActiveTab("Create Payment");
      } else {
        console.log("error", data?.payload?.error);
      }
    }
  };

  return (
    <div className='overflow-hidden rounded-lg mt-9 border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>Payment List</h2>
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
          {filteredRows.map((row, index) => {
            const {
              amount,
              amountPaid,
              companyId,
              description,
              invoiceId,
              method,
              createdAt,
              companyName,
              payment_id,
              username,
            } = row;
            return (
              <tr key={index} className='border-b'>
                <td className='p-4 text-sm'>{index + 1}</td>

                <td className='p-4 text-sm'>{invoiceId}</td>
                <td className='p-4 text-sm'>{payment_id}</td>
                <td className='p-4 text-sm'>{companyName}</td>
                <td className='p-4 text-sm'>{amount}</td>
                <td className='p-4 text-sm'>{amountPaid}</td>
                <td className='p-4 text-sm'>{method}</td>
                <td className='p-4 text-sm'>{formatDate(createdAt)}</td>
                <td className='p-4 text-sm'>pending</td>
                <td className='p-4 text-sm'>{username}</td>
                <td className='p-4 text-sm'>-</td>

                <td className='p-4 text-sm'>
                  <button
                    onClick={() => handleEdit(payment_id)}
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
