/** @format */

// import React, {useEffect, useState} from "react";
// import {Download, Search, Eye} from "lucide-react";
// import {
//   approveQuotation,
//   getAllQuotations,
//   getQuotationById,
// } from "../redux/slice/quotation.slice";
// import {useDispatch, useSelector} from "react-redux";
// import InvoiceTemplate1 from "../../template/InvoiceTemplate1";
// import {getUserData, showError, showSuccess} from "../../utils/config";
// import {createDownloadLog} from "../redux/slice/reports.slice";

// const TABLE_HEAD = [
//   "Quotation ID",
//   "Customer Name",
//   "Phone",
//   "Email",
//   "Issue Date",
//   "Due Date",
//   "Total Amount",
//   "Discount",
//   "Status",
//   "Approve",
//   "Actions",
// ];

// const getStatusColor = (status) => {
//   switch (status) {
//     case "paid":
//       return "text-green-600 bg-green-100";
//     case "pending":
//       return "text-yellow-600 bg-yellow-100";
//     case "cancelled":
//       return "text-red-600 bg-red-100";
//     default:
//       return "text-gray-600 bg-gray-100";
//   }
// };

// export default function QuotationList() {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [quotations, setAllQuotations] = useState([]);
//   const [userData, setUserData] = useState({});
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [triggerDownload, setTriggerDownload] = useState(false);
//   const [showModal, setShowModal] = useState(false); // ✅ new state for modal

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getUserData();
//       setUserData(data);
//     };
//     fetchData();
//   }, []);

//   const allQuotations = useSelector((state) => state.quotation.allQuotations);

//   useEffect(() => {
//     dispatch(getAllQuotations());
//   }, []);

//   useEffect(() => {
//     if (allQuotations?.length > 0) {
//       setAllQuotations(allQuotations);
//     }
//   }, [allQuotations]);

//   const filteredRows = quotations?.filter(
//     (row) =>
//       row?.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.customer_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.issue_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.due_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.total_amount.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleView = (invoice) => {
//     setSelectedInvoice(invoice); // ✅ set invoice data
//     setShowModal(true); // ✅ open modal
//   };

//   const handleDownload = (data) => {
//     setSelectedInvoice(data);
//     setTriggerDownload(true);
//     const objReq = {
//       documentNumber: data?.quotation_id,
//       downloadedAt: new Date(),
//       downloaderRole: userData.role_id,
//       downloaderName: userData.full_Name,
//       type: "quotation",
//       downloadedBy: userData.user_id,
//     };
//     dispatch(createDownloadLog(objReq));
//   };

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

//     setAllQuotations(updated);
//   };

//   return (
//     <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
//       <div className='flex items-center justify-between p-4 border-b'>
//         <h2 className='text-lg font-semibold text-gray-700'>Quotation List</h2>
//         <div className='flex items-center gap-4'>
//           <input
//             type='text'
//             className='w-72 p-2 border border-gray-300 rounded-md'
//             placeholder='Search'
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className='flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-blue-600 border-blue-600 hover:bg-blue-100'>
//             <Download className='w-4 h-4' />
//             Download
//           </button>
//         </div>
//       </div>

//       <table className='min-w-full text-left'>
//         <thead>
//           <tr>
//             {TABLE_HEAD.map((head, index) => (
//               <th
//                 key={index}
//                 className='p-4 text-sm font-medium text-gray-600 border-b bg-gray-50'
//               >
//                 {head}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRows?.map((quote, index) => (
//             <tr key={index} className='border-b'>
//               <td className='p-4 text-sm'>{quote?.quotation_id}</td>
//               <td className='p-4 text-sm'>{quote?.customer_name}</td>
//               <td className='p-4 text-sm'>{quote?.customer_phone}</td>
//               <td className='p-4 text-sm'>{quote?.customerEmail}</td>
//               <td className='p-4 text-sm'>{quote?.issue_date}</td>
//               <td className='p-4 text-sm'>{quote?.due_date}</td>
//               <td className='p-4 text-sm'>₹{quote?.total_amount}</td>
//               <td className='p-4 text-sm'>{quote?.discountValue || "-"}</td>
//               <td className='p-4 text-sm capitalize'>
//                 <span
//                   className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
//                     quote?.approvedStatus
//                   )}`}
//                 >
//                   {quote?.approvedStatus}
//                 </span>
//               </td>
//               <td className='p-4 text-sm text-center'>
//                 <input
//                   type='checkbox'
//                   checked={quote?.approvedStatus === "approved"}
//                   onChange={() => handleApprove(quote)}
//                 />
//               </td>
//               <td className='p-4 text-sm'>
//                 <button
//                   onClick={() => handleView(quote)}
//                   className='text-blue-600 hover:text-blue-800'
//                 >
//                   <Eye className='h-5 w-5' />
//                 </button>
//                 <button
//                   onClick={() => handleDownload(quote)}
//                   className='text-green-600 hover:text-green-800'
//                 >
//                   <Download className='h-5 w-5 ml-3' />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ Modal for viewing Invoice */}
//       {showModal && selectedInvoice && (
//         <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
//           <div className='relative bg-white rounded-lg shadow-lg w-[830px] max-h-[90vh] overflow-hidden'>
//             {/* Close Button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className='absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold z-10'
//             >
//               ×
//             </button>

//             {/* Scrollable content area */}
//             <div className='overflow-y-auto p-6' style={{maxHeight: "90vh"}}>
//               {/* Fixed A4 size content box */}
//               <div
//                 className='mx-auto'
//                 style={{
//                   width: "798px",
//                   height: "1123px", // A4 size at 96 DPI
//                   boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                   backgroundColor: "white",
//                   padding: "20px",
//                 }}
//               >
//                 <InvoiceTemplate1
//                   invoiceData={selectedInvoice}
//                   download={false}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ For downloading as before */}
//       {triggerDownload && selectedInvoice && (
//         <InvoiceTemplate1
//           invoiceData={selectedInvoice}
//           download={triggerDownload}
//         />
//       )}
//     </div>
//   );
// }

import React, {useEffect, useState} from "react";
import {Download, Search, Eye} from "lucide-react";
import {
  approveQuotation,
  getAllQuotations,
  getQuotationById,
} from "../redux/slice/quotation.slice";
import {useDispatch, useSelector} from "react-redux";
import InvoiceTemplate1 from "../../template/InvoiceTemplate1";
import InvoiceTemplate2 from "../../template/InvoiceTemplate2";
import InvoiceTemplate3 from "../../template/InvoiceTemplate3";
import {getUserData, showError, showSuccess} from "../../utils/config";
import * as XLSX from "xlsx";
import {createDownloadLog} from "../redux/slice/reports.slice";

const TABLE_HEAD = [
  "Quotation ID",
  "Customer Name",
  "Phone",
  "Email",
  "Issue Date",
  "Due Date",
  "Total Amount",
  "Discount",
  "Status",
  "Approve",
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

export default function QuotationList() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [quotations, setAllQuotations] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [triggerDownload, setTriggerDownload] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };
    fetchData();
  }, []);

  const allQuotations = useSelector((state) => state.quotation.allQuotations);
  const loading = useSelector((state) => state.quotation.loading);

  useEffect(() => {
    dispatch(getAllQuotations(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (allQuotations?.length > 0) {
      setAllQuotations(allQuotations);
    }
  }, [allQuotations]);

  // Reset download trigger after it's been used
  useEffect(() => {
    if (triggerDownload) {
      // Reset after a short delay to ensure the download has started
      const timer = setTimeout(() => {
        setTriggerDownload(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerDownload]);

  const filteredRows = quotations?.filter(
    (row) =>
      row?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.customer_phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.issue_date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.due_date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.total_amount?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleDownload = (data) => {
    console.log("data", data);
    setSelectedInvoice(data);
    setTriggerDownload(true);

    const objReq = {
      documentNumber: data?.quotation_id,
      downloadedAt: new Date(),
      downloaderRole: userData.role_id,
      downloaderName: userData.full_Name,
      type: "quotation",
      downloadedBy: userData.user_id,
    };
    dispatch(createDownloadLog(objReq));
  };

  const handleApprove = async (quote) => {
    if (quote?.approvedStatus === "approved") {
      showError("Quotation Already Approved");
      return;
    }

    const id = quote?.quotation_id;
    const approvalData = {
      quotation_id: id,
      approvedStatus:
        quotations.find((quote) => quote.quotation_id === id)
          ?.approvedStatus === "approved"
          ? "pending"
          : "approved",
      approvedBy: userData?.user_id,
      approvedByName: userData?.full_Name,
      ApproverCompanyId: userData?.company_id,
      approvedDate: new Date().toISOString(),
      ApproverCompanyName: userData?.company_name,
      approverName: userData?.full_Name,
    };

    if (approvalData) {
      const data = await dispatch(approveQuotation({id, data: approvalData}));
      if (data?.payload?.status == 1) {
        showSuccess("Quotation Approved Successfully");
      }
    }

    const updated = quotations.map((quote) => {
      if (quote.quotation_id === id) {
        return {
          ...quote,
          approvedStatus:
            quote.approvedStatus === "approved" ? "pending" : "approved",
        };
      }
      return quote;
    });

    setAllQuotations(updated);
  };

  // Function to handle download from the eye view modal
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
    if (quotations?.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(quotations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quotation List");

    XLSX.writeFile(workbook, "Quotation.xlsx");
  };
  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <h2 className='text-lg font-semibold text-gray-700'>Quotation List</h2>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              className='w-72 p-2 pl-10 border border-gray-300 rounded-md'
              placeholder='Search quotations...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className='flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-blue-600 border-blue-600 hover:bg-blue-100'>
            Filter
          </button>
          <button
            onClick={handleExport}
            className='flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-blue-600 border-blue-600 hover:bg-blue-100'
          >
            <Download className='w-4 h-4' />
            Export All
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
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
              <tr key={index} className='border-b hover:bg-gray-50'>
                <td className='p-4 text-sm'>{quote?.invoice_no}</td>
                <td className='p-4 text-sm'>{quote?.customer_name}</td>
                <td className='p-4 text-sm'>{quote?.customer_phone}</td>
                <td className='p-4 text-sm'>{quote?.customerEmail}</td>
                <td className='p-4 text-sm'>{quote?.issue_date}</td>
                <td className='p-4 text-sm'>{quote?.due_date}</td>
                <td className='p-4 text-sm'>₹{quote?.total_amount}</td>
                <td className='p-4 text-sm'>{quote?.discountValue || "-"}</td>
                <td className='p-4 text-sm capitalize'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                      quote?.approvedStatus
                    )}`}
                  >
                    {quote?.approvedStatus}
                  </span>
                </td>
                <td className='p-4 text-sm text-center'>
                  <input
                    type='checkbox'
                    checked={quote?.approvedStatus === "approved"}
                    onChange={() => handleApprove(quote)}
                    className='w-4 h-4 accent-blue-600'
                  />
                </td>
                <td className='p-4 text-sm'>
                  <div className='flex space-x-3'>
                    <button
                      onClick={() => handleView(quote)}
                      className='text-blue-600 hover:text-blue-800 transition-colors'
                      title='View'
                    >
                      <Eye className='h-5 w-5' />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedInvoice(quote);
                        setShowModal(true);
                        handleModalDownload();
                      }}
                      className='text-green-600 hover:text-green-800 transition-colors'
                      title='Download'
                    >
                      <Download className='h-5 w-5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRows?.length === 0 && (
              <tr>
                <td colSpan={11} className='p-4 text-center text-gray-500'>
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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

      {/* Modal for viewing Invoice */}
      {showModal && selectedInvoice && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative bg-white rounded-lg shadow-lg w-[830px] max-h-[90vh] overflow-hidden'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-4 border-b'>
              <h3 className='text-lg font-semibold'>
                Quotation #{selectedInvoice.quotation_id}
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
                {selectedInvoice?.quotation_patent == 1 && (
                  <InvoiceTemplate1
                    invoiceData={selectedInvoice}
                    download={false}
                  />
                )}
                {selectedInvoice?.quotation_patent == 2 && (
                  <InvoiceTemplate2
                    invoiceData={selectedInvoice}
                    download={false}
                  />
                )}
                {selectedInvoice?.quotation_patent == 3 && (
                  <InvoiceTemplate3
                    invoiceData={selectedInvoice}
                    download={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden component for downloading */}
      {triggerDownload && selectedInvoice && (
        <div style={{display: "none"}}>
          {selectedInvoice?.quotation_patent == 1 && (
            <InvoiceTemplate1
              invoiceData={selectedInvoice}
              download={triggerDownload}
            />
          )}
          {selectedInvoice?.quotation_patent == 2 && (
            <InvoiceTemplate2
              invoiceData={selectedInvoice}
              download={triggerDownload}
            />
          )}
          {selectedInvoice?.quotation_patent == 3 && (
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
