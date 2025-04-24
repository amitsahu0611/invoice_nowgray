/** @format */

import React, {useEffect, useState} from "react";
import {Download, Pencil, Eye} from "lucide-react";
import {getQuotationById} from "../redux/slice/quotation.slice";
import {useDispatch, useSelector} from "react-redux";
import InvoiceTemplate1 from "../../template/InvoiceTemplate1";

import * as XLSX from "xlsx";
import {
  formatDate,
  getUserData,
  showError,
  showSuccess,
} from "../../utils/config";
import {getAllInvoices, getInvoiceById} from "../redux/slice/invoice.slice";
import InvoiceTemplate3 from "../../template/InvoiceTemplate3";
import InvoiceTemplate2 from "../../template/InvoiceTemplate2";
import {createDownloadLog} from "../redux/slice/reports.slice";

const TABLE_HEAD = [
  "Invoice ID",
  "Invoice No",
  "Customer Name",
  "Phone",
  "Email",
  "Issue Date",
  "Due Date",
  "Total Amount",
  "Approved By",
  "Approved Date",
  "Discount",
  "Actions",
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

export default function InvoiceList({setActiveTab}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setAllInvoices] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [triggerDownload, setTriggerDownload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);

  console.log("selectedInvoice", selectedInvoice);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      console.log("data", data);
      setUserData(data);
    };

    fetchData();
  }, []);

  const allInvoices = useSelector((state) => state.invoice.allInvoices);

  useEffect(() => {
    dispatch(getAllInvoices(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (allInvoices?.length > 0) {
      setAllInvoices(allInvoices);
    }
  }, [allInvoices]);

  // Filter the rows based on the search query
  const filteredRows = invoices?.filter(
    (row) =>
      row?.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.customer_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.issue_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.due_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.total_amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.approverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.approvedDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  // const handleDownload = (data) => {
  //   console.log("data", data);
  //   setSelectedInvoice(data);
  //   setTriggerDownload(true);

  //   // Log the download
  //   const objReq = {
  //     documentNumber: data?.quotation_id,
  //     downloadedAt: new Date(),
  //     downloaderRole: userData.role_id,
  //     downloaderName: userData.full_Name,
  //     type: "invoice",
  //     downloadedBy: userData.user_id,
  //   };
  //   dispatch(createDownloadLog(objReq));
  // };

  const handleDownload = (quote) => {
    console.log("quote", quote);
    setSelectedInvoice(quote);
    if (selectedInvoice) {
      setTriggerDownload(true);

      // Log the download
      const objReq = {
        documentNumber: selectedInvoice?.quotation_id,
        downloadedAt: new Date(),
        downloaderRole: userData.role_id,
        downloaderName: userData.full_Name,
        type: "invoice",
        downloadedBy: userData.user_id,
      };
      dispatch(createDownloadLog(objReq));
    }
  };

  //   const handleApprove = async (quote) => {
  //     if (quote?.approvedStatus === "approved") {
  //       showError("Quotation Already Approved");
  //       return;
  //     }
  //     const id = quote?.quotation_id;
  //     let approvalData = {
  //       quotation_id: id,
  //       approvedStatus:
  //         quotations.find((quote) => quote.quotation_id === id)
  //           ?.approvedStatus === "approved"
  //           ? "pending"
  //           : "approved",
  //       approvedBy: userData?.user_id,
  //       approvedByName: userData?.full_Name,
  //       ApproverCompanyId: userData?.company_id,
  //       approvedDate: new Date().toISOString(),
  //       ApproverCompanyName: userData?.company_name,
  //       approverName: userData?.full_Name,
  //     };

  //     if (approvalData) {
  //       const data = await dispatch(approveQuotation({id, data: approvalData}));
  //       if (data?.payload?.status == 1) {
  //         showSuccess("Quotation Approved Successfully");
  //       }
  //     }

  //     const updated = quotations.map((quote) => {
  //       if (quote.quotation_id === id) {
  //         return {
  //           ...quote,
  //           approvedStatus:
  //             quote.approvedStatus === "approved" ? "pending" : "approved",
  //         };
  //       }
  //       return quote;
  //     });

  //     setAllInvoices(updated);
  //   };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  useEffect(() => {
    if (triggerDownload) {
      // Reset after a short delay to ensure the download has started
      const timer = setTimeout(() => {
        setTriggerDownload(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerDownload]);

  const handleModalDownload = () => {
    if (selectedInvoice) {
      setTriggerDownload(true);

      const objReq = {
        documentNumber: selectedInvoice?.quotation_id,
        downloadedAt: new Date(),
        downloaderRole: userData.role_id,
        downloaderName: userData.full_Name,
        type: "quotation",
        downloadedBy: userData.user_id,
      };
      dispatch(createDownloadLog(objReq));
    }
  };

  const handleExport = () => {
    if (invoices?.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(invoices);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    XLSX.writeFile(workbook, "Invoice.xlsx");
  };

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>Invoice List</h2>
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
          {filteredRows?.map((quote, index) => (
            <tr key={index} className='border-b'>
              <td className='p-4 text-sm'>{index + 1}</td>
              <td className='p-4 text-sm'>{quote?.invoice_no}</td>
              <td className='p-4 text-sm'>{quote?.customer_name}</td>
              <td className='p-4 text-sm'>{quote?.customer_phone}</td>
              <td className='p-4 text-sm'>{quote?.customerEmail}</td>
              <td className='p-4 text-sm'>{quote?.issue_date}</td>
              <td className='p-4 text-sm'>{quote?.due_date}</td>
              <td className='p-4 text-sm'>₹{quote?.total_amount}</td>
              <td className='p-4 text-sm'>{quote?.approverName}</td>
              <td className='p-4 text-sm'>{formatDate(quote?.approvedDate)}</td>
              <td className='p-4 text-sm'>{quote?.discountValue || "-"}</td>
              <td className='p-4 text-sm'>
                {/* <button
                  onClick={() => handleView(quote?.invoice_id)}
                  className='text-blue-600 hover:text-blue-800'
                >
                  <Pencil className='h-5 w-5 mr-3' />
                </button> */}
                <button
                  onClick={() => handleView(quote)}
                  className='text-blue-600 hover:text-blue-800'
                >
                  <Eye className='h-5 w-5' />
                </button>
                <button
                  onClick={() => {
                    setSelectedInvoice(quote);
                    setShowModal(true);
                    handleModalDownload();
                  }}
                  className='text-green-600 hover:text-green-800'
                >
                  <Download className='h-5 w-5 ml-3' />
                </button>
              </td>
            </tr>
          ))}
          {filteredRows?.length === 0 && (
            <tr>
              <td colSpan={11} className='p-4 text-center text-gray-500'>
                No Invoice found
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

      {showModal && selectedInvoice && (
        <div className='fixed inset-0 z-50 flex flex-col items-center gap-4 justify-center bg-black bg-opacity-50'>
          <div className='relative bg-white rounded-lg shadow-lg w-[860px] max-h-[90vh] overflow-hidden'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-4 border-b'>
              <h3 className='text-lg font-semibold'>
                Invoice #{selectedInvoice.quotation_id}
              </h3>
              <div className='flex space-x-2'>
                <button
                  onClick={handleModalDownload}
                  className='flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                >
                  <Download className='w-4 h-4' />
                  Download
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-gray-600 hover:text-red-500 text-xl font-bold'
                >
                  ×
                </button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className='overflow-y-auto p-6' style={{maxHeight: "80vh"}}>
              {/* Fixed A4 size content box */}
              <div
                className='mx-auto bg-white'
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                {selectedInvoice?.invoice_patent == 1 && (
                  <InvoiceTemplate1
                    invoiceData={selectedInvoice}
                    download={false}
                  />
                )}
                {selectedInvoice?.invoice_patent == 2 && (
                  <InvoiceTemplate2
                    invoiceData={selectedInvoice}
                    download={false}
                  />
                )}
                {selectedInvoice?.invoice_patent == 3 && (
                  <InvoiceTemplate3
                    invoiceData={selectedInvoice}
                    download={false}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Close
          </button>
        </div>
      )}

      {/* Hidden component for downloading */}
      {triggerDownload && selectedInvoice && (
        <div style={{display: "none"}}>
          {selectedInvoice?.invoice_patent == 1 && (
            <InvoiceTemplate1
              invoiceData={selectedInvoice}
              download={triggerDownload}
            />
          )}
          {selectedInvoice?.invoice_patent == 2 && (
            <InvoiceTemplate2
              invoiceData={selectedInvoice}
              download={triggerDownload}
            />
          )}
          {selectedInvoice?.invoice_patent == 3 && (
            <InvoiceTemplate3
              invoiceData={selectedInvoice}
              download={triggerDownload}
            />
          )}
        </div>
      )}
    </div>
  );
}
