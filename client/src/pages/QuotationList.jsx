/** @format */

// /** @format */

// import React, {useEffect, useState} from "react";
// import {Download, Search, Pencil, Eye} from "lucide-react";
// import {
//   approveQuotation,
//   getAllQuotations,
//   getQuotationById,
//   updateQuotation,
// } from "../redux/slice/quotation.slice";
// import {useDispatch, useSelector} from "react-redux";
// import InvoiceTemplate1 from "../../template/InvoiceTemplate1";
// import {getUserData, showError, showSuccess} from "../../utils/config";

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

// export default function QuotationList({setActiveTab}) {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [quotations, setAllQuotations] = useState([]);
//   const [userData, setUserData] = useState({});
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [triggerDownload, setTriggerDownload] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getUserData();
//       console.log("data", data);
//       setUserData(data);
//     };

//     fetchData();
//   }, []);

//   const allQuotations = useSelector((state) => state.quotation.allQuotations);
//   console.log("quotations", quotations);

//   useEffect(() => {
//     dispatch(getAllQuotations());
//   }, []);

//   useEffect(() => {
//     if (allQuotations?.length > 0) {
//       setAllQuotations(allQuotations);
//     }
//   }, [allQuotations]);

//   // Filter the rows based on the search query
//   const filteredRows = quotations?.filter(
//     (row) =>
//       row?.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.customer_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.issue_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.due_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row?.total_amount.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleView = (id) => {
//     dispatch(getQuotationById(id));
//     setActiveTab("Create Quotation");
//   };

//   const handleDownload = (data) => {
//     <InvoiceTemplate1 invoiceData={data} download={true} />;
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
//         <div>
//           <h2 className='text-lg font-semibold text-gray-700'>
//             Quotation List
//           </h2>
//         </div>
//         <div className='flex items-center gap-4'>
//           <div className='w-72'>
//             <input
//               type='text'
//               className='w-full p-2 border border-gray-300 rounded-md'
//               placeholder='Search'
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
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
//                   onClick={() => handleView(quote?.quotation_id)}
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
//     </div>
//   );
// }
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
import {getUserData, showError, showSuccess} from "../../utils/config";
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

export default function QuotationList({setActiveTab}) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [quotations, setAllQuotations] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [triggerDownload, setTriggerDownload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchData();
  }, []);

  const allQuotations = useSelector((state) => state.quotation.allQuotations);

  useEffect(() => {
    dispatch(getAllQuotations());
  }, []);

  useEffect(() => {
    if (allQuotations?.length > 0) {
      setAllQuotations(allQuotations);
    }
  }, [allQuotations]);

  // Filter the rows based on the search query
  const filteredRows = quotations?.filter(
    (row) =>
      row?.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.customer_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.issue_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.due_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row?.total_amount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (id) => {
    dispatch(getQuotationById(id));
    setActiveTab("Create Quotation");
  };

  const handleDownload = (data) => {
    setSelectedInvoice(data); // Set the selected invoice data
    setTriggerDownload(true); // Trigger the download
    console.log("data", data);
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
    let approvalData = {
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

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-md'>
      <div className='flex items-center justify-between p-4 border-b'>
        <div>
          <h2 className='text-lg font-semibold text-gray-700'>
            Quotation List
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
          {filteredRows?.map((quote, index) => (
            <tr key={index} className='border-b'>
              <td className='p-4 text-sm'>{quote?.quotation_id}</td>
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
                />
              </td>
              <td className='p-4 text-sm'>
                <button
                  onClick={() => handleView(quote?.quotation_id)}
                  className='text-blue-600 hover:text-blue-800'
                >
                  <Eye className='h-5 w-5' />
                </button>
                <button
                  onClick={() => handleDownload(quote)}
                  className='text-green-600 hover:text-green-800'
                >
                  <Download className='h-5 w-5 ml-3' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {triggerDownload && selectedInvoice && (
        <InvoiceTemplate1
          invoiceData={selectedInvoice}
          download={triggerDownload}
        />
      )}
    </div>
  );
}
