/** @format */

// /** @format */

// // /** @format */

// import React, {useEffect} from "react";
// import {jsPDF} from "jspdf";
// import html2canvas from "html2canvas";
// import {forImage, showSuccess} from "../utils/config";

// const InvoiceTemplate1 = ({invoiceData, download}) => {
//   console.log("download", download);
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = {year: "numeric", month: "long", day: "numeric"};
//     return date.toLocaleDateString("en-GB", options);
//   };

//   const downloadPDF = () => {
//     const input = document.getElementById("invoice-content");

//     html2canvas(input, {
//       scale: 3,
//       useCORS: true,
//       logging: false,
//     }).then((canvas) => {
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgData = canvas.toDataURL("image/png");

//       const pageWidth = pdf.internal.pageSize.width;
//       const pageHeight = pdf.internal.pageSize.height;
//       const imgWidth = pageWidth - 20;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//       pdf.save(`invoice-${invoiceData?.invoice_no}.pdf`);

//       console.log("ino", invoiceData);

//       // fetch(`${Base_URL}nowgrayInvoice`, {
//       //   method: "POST",
//       //   body: JSON.stringify(invoiceData),
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // })
//       //   .then((response) => response.json())
//       //   .then((data) => {
//       //     showSuccess("New invoice created successfully");
//       //     console.log("PDF uploaded successfully, file path:", data.filePath);
//       //   })
//       //   .catch((error) => {
//       //     console.error("Error uploading PDF:", error);
//       //   });
//     });
//   };

//   useEffect(() => {
//     if (download) {
//       downloadPDF();
//     }
//   }, [download]);

//   return (
//     <>
//       <div>
//         <div
//           id='invoice-content'
//           className='max-w-7xl w-[210mm] h-[297mm] mx-auto p-6 bg-white border-2 border-gray-200'
//         >
//           <div className='border-t-8 border-blue-800 pt-4 flex justify-between items-start'>
//             <div>
//               <div className='text-yellow-500 text-2xl font-bold'>Ecomm11</div>
//               <div className='text-gray-600 text-sm'>
//                 1st to 11th Floor, 29-110, Sec-29, Indira Nagar
//                 <br />
//                 Lucknow, Uttar Pradesh, 226016
//                 <br />
//                 info@ecomm11.com, +91 9139931174
//                 <br />
//                 GSTIN: 07AAKCC6957N1ZM
//               </div>
//             </div>
//             <div className='flex justify-end mt-0'>
//               {/* <img
//                 style={{width: "35%"}}
//                 src={`${forImage}/logo/ecomm.png`}
//                 alt='Nowgray'
//               /> */}
//             </div>
//           </div>

//           <div className='text-yellow-500 text-4xl my-5'>Invoice</div>
//           <div className='mb-5 text-sm'>
//             Submitted on {formatDate(invoiceData?.issue_date)}
//           </div>

//           <div className='flex justify-between mb-8'>
//             <div className='w-1/3'>
//               <h3 className='text-sm mb-1'>Invoice for</h3>
//               <p className='font-bold uppercase'>
//                 {invoiceData?.customer_company || "N/A"}
//               </p>
//               <p>+91 {invoiceData?.customer_phone || "xxxxxxxxxx"}</p>
//               <p className='font-bold'>
//                 GSTIN: {invoiceData?.customer_gst || "N/A"}
//               </p>
//               <p>{invoiceData?.customer_name || "N/A"}</p>
//               <p>PAN: {invoiceData?.pannumber || "N/A"}</p>
//               <p>PAN Code: {invoiceData?.pancode || "N/A"}</p>
//               <p>{invoiceData?.customerEmail || "N/A"}</p>
//             </div>
//             <div className='w-1/3'>
//               <h3 className='text-sm mb-1'>Payable to</h3>
//               <p>Ecomm11</p>
//               <p>11 Years of Success</p>
//             </div>
//             <div className='w-1/3'>
//               <h3 className='text-sm mb-1'>Invoice #</h3>
//               <p>{invoiceData?.invoice_no}</p>
//               <h3 className='text-sm mb-1'>Project</h3>
//               <p>{invoiceData?.project_name || "N/A"}</p>
//               <h3 className='text-sm mb-1'>Due date</h3>
//               <p>{formatDate(invoiceData?.due_date) || "N/A"}</p>
//             </div>
//           </div>

//           <table className='w-full border-collapse mb-5'>
//             <thead>
//               <tr>
//                 <th className='bg-gray-200 text-left p-2'>Description</th>
//                 <th className='bg-gray-200 text-left p-2'>Month</th>
//                 <th className='bg-gray-200 text-left p-2'>Monthly price</th>
//                 <th className='bg-gray-200 text-left p-2'>Total price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoiceData &&
//                 invoiceData?.items?.map((items) => (
//                   <tr>
//                     <td className='p-2 border-b border-gray-200'>
//                       {items?.description || "N/A"}
//                     </td>
//                     <td className='p-2 border-b border-gray-200'>
//                       {" "}
//                       {items?.month || "N/A"}
//                     </td>
//                     <td className='p-2 border-b border-gray-200 text-right'>
//                       ₹ {items?.monthly_price || "N/A"}
//                     </td>
//                     <td className='p-2 border-b border-gray-200 text-right'>
//                       ₹ {items?.month * items?.monthly_price || "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>

//           <div className='bg-gray-200 p-2 mb-5'>
//             <h4 className='mb-1'>Terms & Conditions:</h4>
//             <p className='text-xs'>
//               Clients must provide all product details, product images, or the
//               listings. We are not responsible for any copyright issues.
//             </p>
//             <p className='text-xs'>
//               This is the advance payment for 1-month Birakt account management
//               services. Payments are non-refundable and follow the agreed
//               schedule.
//             </p>
//           </div>

//           <div className='text-right mb-2'>
//             <button className='bg-yellow-500 text-white py-1 px-4 text-sm'>
//               Submit
//             </button>
//             <span className='ml-5 font-bold'>
//               ₹ {invoiceData?.total_amount || 0.0}
//             </span>
//           </div>
//           <div className='text-right mb-5'>
//             <span className='text-yellow-500 font-bold'>
//               GST ({invoiceData?.tax_percent}%)
//             </span>
//             <span className='ml-5 font-bold'>
//               ₹{" "}
//               {(invoiceData?.tax_percent / 100) *
//                 parseInt(invoiceData?.total_amount) || 0.0}
//             </span>
//           </div>

//           <div className='flex justify-between'>
//             <div className='border border-gray-300 p-2 w-1/2'>
//               <h3 className='text-center text-sm'>Payment Details</h3>
//               <p className='text-xs'>
//                 <strong>ACCOUNT HOLDER NAME:</strong> ECOMM VYAPARVANI MISSION
//               </p>
//               <p className='text-xs'>
//                 <strong>ACCOUNT BRANCH:</strong> JANAKPURAM
//               </p>
//               <p className='text-xs'>
//                 <strong>ACCOUNT NO.:</strong> 50200291570106
//               </p>
//               <p className='text-xs'>
//                 <strong>IFSC CODE:</strong> HDFC0001908
//               </p>
//             </div>
//             <div className='border border-black p-2 w-1/2 text-right'>
//               <p>Total Payable (Incl. GST)</p>
//               <h2 className='text-2xl'>
//                 ₹{" "}
//                 {parseInt(invoiceData?.total_amount) +
//                   (invoiceData?.tax_percent / 100) *
//                     invoiceData?.total_amount || 0.0}
//               </h2>
//             </div>
//           </div>
//         </div>
//         <div className='flex justify-center mt-6'>
//           <button
//             onClick={downloadPDF}
//             className='bg-green-600 text-white py-2 px-6 rounded-md font-semibold'
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InvoiceTemplate1;

/** @format */

import React, {useEffect} from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {forImage, showSuccess} from "../utils/config";

const InvoiceTemplate1 = ({invoiceData, download}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {year: "numeric", month: "long", day: "numeric"};
    return date.toLocaleDateString("en-GB", options);
  };

  const downloadPDF = () => {
    const input = document.getElementById("invoice-content");

    html2canvas(input, {
      scale: 3,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");

      const pageWidth = pdf.internal.pageSize.width;
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`invoice-${invoiceData?.invoice_no}.pdf`);
    });
  };

  useEffect(() => {
    if (download) {
      downloadPDF();
    }
  }, [download]);

  return (
    <div>
      <div
        id='invoice-content'
        className='max-w-7xl w-[210mm] h-[297mm] mx-auto p-6 bg-white border-2 border-gray-200'
      >
        <div className='border-t-8 border-blue-800 pt-4 flex justify-between items-start'>
          <div>
            <div className='text-yellow-500 text-2xl font-bold'>Ecomm11</div>
            <div className='text-gray-600 text-sm'>
              1st to 11th Floor, 29-110, Sec-29, Indira Nagar
              <br />
              Lucknow, Uttar Pradesh, 226016
              <br />
              info@ecomm11.com, +91 9139931174
              <br />
              GSTIN: 07AAKCC6957N1ZM
            </div>
          </div>
        </div>

        <div className='text-yellow-500 text-4xl my-5'>Invoice</div>
        <div className='mb-5 text-sm'>
          Submitted on {formatDate(invoiceData?.issue_date)}
        </div>

        <div className='flex justify-between mb-8'>
          <div className='w-1/3'>
            <h3 className='text-sm mb-1'>Invoice for</h3>
            <p className='font-bold uppercase'>
              {invoiceData?.customer_company || "N/A"}
            </p>
            <p>+91 {invoiceData?.customer_phone || "xxxxxxxxxx"}</p>
            <p className='font-bold'>
              GSTIN: {invoiceData?.customer_gst || "N/A"}
            </p>
            <p>{invoiceData?.customer_name || "N/A"}</p>
            <p>PAN: {invoiceData?.pannumber || "N/A"}</p>
            <p>PAN Code: {invoiceData?.pancode || "N/A"}</p>
            <p>{invoiceData?.customerEmail || "N/A"}</p>
          </div>
          <div className='w-1/3'>
            <h3 className='text-sm mb-1'>Payable to</h3>
            <p>Ecomm11</p>
            <p>11 Years of Success</p>
          </div>
          <div className='w-1/3'>
            <h3 className='text-sm mb-1'>Invoice #</h3>
            <p>{invoiceData?.invoice_no}</p>
            <h3 className='text-sm mb-1'>Project</h3>
            <p>{invoiceData?.project_name || "N/A"}</p>
            <h3 className='text-sm mb-1'>Due date</h3>
            <p>{formatDate(invoiceData?.due_date) || "N/A"}</p>
          </div>
        </div>

        <table className='w-full border-collapse mb-5'>
          <thead>
            <tr>
              <th className='bg-gray-200 text-left p-2'>Description</th>
              <th className='bg-gray-200 text-left p-2'>Month</th>
              <th className='bg-gray-200 text-left p-2'>Monthly price</th>
              <th className='bg-gray-200 text-left p-2'>Total price</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.items?.map((item, index) => (
              <tr key={index}>
                <td className='p-2 border-b border-gray-200'>
                  {item?.description || "N/A"}
                </td>
                <td className='p-2 border-b border-gray-200'>
                  {item?.month || "N/A"}
                </td>
                <td className='p-2 border-b border-gray-200 text-right'>
                  ₹ {item?.monthly_price || "N/A"}
                </td>
                <td className='p-2 border-b border-gray-200 text-right'>
                  ₹ {item?.month * item?.monthly_price || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='bg-gray-200 p-2 mb-5'>
          <h4 className='mb-1'>Terms & Conditions:</h4>
          <p className='text-xs'>
            Clients must provide all product details, product images, or the
            listings. We are not responsible for any copyright issues.
          </p>
          <p className='text-xs'>
            This is the advance payment for 1-month Birakt account management
            services. Payments are non-refundable and follow the agreed
            schedule.
          </p>
        </div>

        <div className='text-right mb-2'>
          <button className='bg-yellow-500 text-white py-1 px-4 text-sm'>
            Submit
          </button>
          <span className='ml-5 font-bold'>
            ₹ {invoiceData?.total_amount || 0.0}
          </span>
        </div>
        <div className='text-right mb-5'>
          <span className='text-yellow-500 font-bold'>
            GST ({invoiceData?.tax_percent}%)
          </span>
          <span className='ml-5 font-bold'>
            ₹{" "}
            {(invoiceData?.tax_percent / 100) *
              parseInt(invoiceData?.total_amount) || 0.0}
          </span>
        </div>

        <div className='flex justify-between'>
          <div className='border border-gray-300 p-2 w-1/2'>
            <h3 className='text-center text-sm'>Payment Details</h3>
            <p className='text-xs'>
              <strong>ACCOUNT HOLDER NAME:</strong> ECOMM VYAPARVANI MISSION
            </p>
            <p className='text-xs'>
              <strong>ACCOUNT BRANCH:</strong> JANAKPURAM
            </p>
            <p className='text-xs'>
              <strong>ACCOUNT NO.:</strong> 50200291570106
            </p>
            <p className='text-xs'>
              <strong>IFSC CODE:</strong> HDFC0001908
            </p>
          </div>
          <div className='border border-black p-2 w-1/2 text-right'>
            <p>Total Payable (Incl. GST)</p>
            <h2 className='text-2xl'>
              ₹{" "}
              {parseInt(invoiceData?.total_amount) +
                (invoiceData?.tax_percent / 100) * invoiceData?.total_amount ||
                0.0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate1;
