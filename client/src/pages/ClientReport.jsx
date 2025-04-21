/** @format */

import React, {useEffect, useState, useRef} from "react";
import html2pdf from "html2pdf.js";
import {Eye, Download} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {reportByCustomer} from "../redux/slice/reports.slice";
import {formatDate} from "../../utils/config";

const TABLE_HEAD = [
  "S.No",
  "Client Name",
  "Email",
  "Phone",
  "Total Invoices",
  "Total Paid",
  "Total Due",
  "Actions",
];

const ITEMS_PER_PAGE = 5;

export default function ClientReport() {
  const dispatch = useDispatch();
  const reportByClient = useSelector((state) => state.report.reportsByClient);
  const [searchQuery, setSearchQuery] = useState("");
  const [allReports, setAllReports] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const printRef = useRef();

  useEffect(() => {
    dispatch(reportByCustomer());
  }, []);

  useEffect(() => {
    if (reportByClient?.length > 0) {
      setAllReports(reportByClient);
    }
  }, [reportByClient]);

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const filteredRows = allReports?.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client?.client_name?.toLowerCase().includes(query) ||
      client?.client_email?.toLowerCase().includes(query) ||
      client?.client_phone?.toString().includes(query)
    );
  });

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredRows.length / ITEMS_PER_PAGE);

  const getTotal = (client) => {
    let totalPaid = 0,
      totalDue = 0,
      totalAmount = 0;
    client.invoices.forEach((inv) => {
      totalPaid += inv.paid || 0;
      totalDue += inv.balance || 0;
      totalAmount += inv.total_amount || 0;
    });
    return {totalPaid, totalDue, totalAmount};
  };

  const handleDownload = () => {
    const element = printRef.current;

    // Expand height before capturing
    const originalMaxHeight =
      element.querySelector("div.bg-white").style.maxHeight;
    element.querySelector("div.bg-white").style.maxHeight = "none";

    const opt = {
      margin: 0.5,
      filename: `${selectedClient.client_name}_summary.pdf`,
      image: {type: "jpeg", quality: 0.98},
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      },
      jsPDF: {unit: "in", format: "a4", orientation: "portrait"},
      pagebreak: {mode: ["avoid-all", "css", "legacy"]},
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // Reset height
        element.querySelector("div.bg-white").style.maxHeight =
          originalMaxHeight;
      });
  };

  return (
    <div className='rounded-lg border bg-white shadow-md overflow-hidden'>
      <div className='flex items-center justify-between p-4 border-b bg-gray-50'>
        <h2 className='text-lg font-semibold text-gray-800'>Client Report</h2>
        <input
          type='text'
          placeholder='Search client...'
          className='p-2 border rounded-md w-72'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className='min-w-full text-left'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={index}
                className='p-4 bg-gray-100 text-sm font-semibold border-b'
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows?.map((client, index) => {
            const {totalPaid, totalDue} = getTotal(client);
            return (
              <tr key={client.client_id} className='border-b hover:bg-gray-50'>
                <td className='p-4 text-sm'>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className='p-4 text-sm'>{client.client_name}</td>
                <td className='p-4 text-sm'>{client.client_email}</td>
                <td className='p-4 text-sm'>{client.client_phone}</td>
                <td className='p-4 text-sm'>{client.invoices?.length || 0}</td>
                <td className='p-4 text-sm'>₹{totalPaid}</td>
                <td className='p-4 text-sm'>₹{totalDue}</td>
                <td className='p-4 text-sm'>
                  <button
                    onClick={() => handleViewDetails(client)}
                    className='text-blue-600 hover:underline flex items-center gap-1'
                  >
                    <Eye className='w-4 h-4' /> View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='flex justify-between items-center p-4 bg-gray-50 border-t'>
        <p className='text-sm text-gray-600'>
          Showing {paginatedRows.length} of {filteredRows.length} clients
        </p>
        <div className='flex gap-2'>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 relative'>
            {/* Header */}
            <div className='sticky top-0 bg-white z-10 pb-4 mb-6 border-b flex justify-between items-start'>
              <div>
                <h3 className='text-2xl font-bold text-gray-800'>
                  {selectedClient?.client_name}'s Summary
                </h3>
                <p className='text-sm text-gray-500'>
                  All invoices and payment details listed below
                </p>
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={handleDownload}
                  className='bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-blue-600 flex items-center gap-2'
                >
                  <Download className='w-5 h-5' /> Download
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-red-500 hover:underline text-sm'
                >
                  Close
                </button>
              </div>
            </div>

            {/* Summary Top Card */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
              <div className='bg-blue-100 text-blue-800 p-4 rounded-xl shadow text-center'>
                <h4 className='text-xl font-bold'>
                  ₹
                  {selectedClient.invoices.reduce(
                    (sum, i) => sum + i.total_amount,
                    0
                  )}
                </h4>
                <p className='text-sm'>Gross Total</p>
              </div>
              <div className='bg-green-100 text-green-800 p-4 rounded-xl shadow text-center'>
                <h4 className='text-xl font-bold'>
                  ₹{selectedClient.invoices.reduce((sum, i) => sum + i.paid, 0)}
                </h4>
                <p className='text-sm'>Total Paid</p>
              </div>
              <div className='bg-red-100 text-red-800 p-4 rounded-xl shadow text-center'>
                <h4 className='text-xl font-bold'>
                  ₹
                  {selectedClient.invoices.reduce(
                    (sum, i) => sum + i.balance,
                    0
                  )}
                </h4>
                <p className='text-sm'>Total Due</p>
              </div>
              <div className='bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow text-center'>
                <h4 className='text-xl font-bold'>
                  ₹
                  {selectedClient.invoices.reduce(
                    (sum, i) => sum + (i.paid - i.total_amount),
                    0
                  )}
                </h4>
                <p className='text-sm'>Profit / Loss</p>
              </div>
            </div>

            {/* Invoices Section */}
            <div ref={printRef} className='space-y-6'>
              {selectedClient.invoices.map((invoice, idx) => (
                <div
                  key={invoice.invoice_id}
                  className='border border-gray-200 rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition'
                >
                  <h4 className='text-lg font-semibold text-gray-700 mb-4'>
                    Invoice #{invoice.invoice_no}
                    <span className='block text-sm text-gray-500 font-normal'>
                      Total: ₹{invoice.total_amount} | Paid: ₹{invoice.paid} |
                      Due: ₹{invoice.balance}
                    </span>
                  </h4>

                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left border rounded-md'>
                      <thead className='bg-gray-100'>
                        <tr className='text-gray-700'>
                          <th className='p-2 border'>#</th>
                          <th className='p-2 border'>Amount</th>
                          <th className='p-2 border'>Method</th>
                          <th className='p-2 border'>Description</th>
                          <th className='p-2 border'>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.payments?.length > 0 ? (
                          invoice.payments.map((payment, index) => (
                            <tr key={index} className='hover:bg-gray-50'>
                              <td className='p-2 border'>{index + 1}</td>
                              <td className='p-2 border'>
                                ₹ {payment.amountPaid || "-"}
                              </td>
                              <td className='p-2 border'>
                                {payment.method || "-"}
                              </td>
                              <td className='p-2 border'>
                                {payment.description || "-"}
                              </td>
                              <td className='p-2 border'>
                                {formatDate(payment.createdAt)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className='text-center text-gray-500 p-2'
                            >
                              No payments found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Pagination Placeholder */}
              <div className='flex justify-center mt-6'>
                <div className='text-sm text-gray-600'>
                  {/* Implement pagination controls here */}
                  Page 1 of 1
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
