/** @format */

import React, {useEffect} from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {forImage} from "../utils/config";

const InvoiceTemplate1 = ({invoiceData, download}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = {year: "numeric", month: "long", day: "numeric"};
    return date.toLocaleDateString("en-GB", options);
  };

  console.log("invoiceData", invoiceData);

  const downloadPDF = () => {
    const input = document.getElementById("invoice-content");

    // Set a fixed width for better scaling
    const originalWidth = input.offsetWidth;
    const originalHeight = input.offsetHeight;

    html2canvas(input, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      width: originalWidth,
      height: originalHeight,
    }).then((canvas) => {
      // A4 size in mm: 210 x 297
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions to fit A4 properly
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate the width to fit the page with margins
      const imgWidth = pageWidth - 20; // 10mm margins on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If content is longer than one page, handle pagination
      if (imgHeight > pageHeight - 20) {
        // Content is taller than one page, scale to fit height
        const scaleFactor = (pageHeight - 20) / imgHeight;
        const scaledWidth = imgWidth * scaleFactor;

        pdf.addImage(imgData, "PNG", 10, 10, scaledWidth, pageHeight - 20);
      } else {
        // Content fits on one page
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      }

      pdf.save(`invoice-${invoiceData?.invoice_no || "download"}.pdf`);
    });
  };

  useEffect(() => {
    const startDownload = async () => {
      if (download && invoiceData) {
        await downloadPDF();
      }
    };
    startDownload();
  }, [download]);

  const totalBeforeDiscount = invoiceData?.items?.reduce((acc, item) => {
    return acc + parseFloat(item.total_price || 0);
  }, 0);

  let discountAmount = 0;
  if (invoiceData?.discountType === "percent") {
    discountAmount = (totalBeforeDiscount * invoiceData.discountValue) / 100;
  } else if (invoiceData?.discountType === "amount") {
    discountAmount = parseFloat(invoiceData.discountValue || 0);
  }

  const discountedTotal = totalBeforeDiscount - discountAmount;
  const gstAmount = (discountedTotal * (invoiceData?.tax_percent || 0)) / 100;
  const finalPayable = discountedTotal + gstAmount;

  return (
    <div>
      <div
        id='invoice-content'
        className='w-[210mm] h-[297mm] mx-auto p-6 bg-white border-2 border-gray-200'
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "15mm",
          boxSizing: "border-box",
          fontSize: "12pt",
        }}
      >
        <div className='border-t-8 border-blue-800 pt-4 flex justify-between items-start'>
          <div>
            <div className='text-yellow-500 text-2xl font-bold'>Ecomm11</div>
            <div className='text-gray-600'>
              1st to 11th Floor, 29-110, Sec-29, Indira Nagar
              <br />
              Lucknow, Uttar Pradesh, 226016
              <br />
              info@ecomm11.com, +91 9139931174
              <br />
              GSTIN: 07AAKCC6957N1ZM
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <img
              src={`${forImage}/logo/ecomm.png`} // replace with your image path
              alt='Ecomm11 Logo'
              style={{
                height: "150px",
                borderRadius: "8px",
                padding: "10px",
              }}
              className='w-32 h-auto'
            />
          </div>
        </div>

        <div className='text-yellow-500 text-4xl'>Invoice</div>
        <div className='text-sm mt-2'>
          Submitted on {formatDate(invoiceData?.issue_date)}
        </div>

        <div className='flex justify-between mb-8 mt-6'>
          <div className='w-1/3'>
            <h3 className='text-sm font-bold mb-2'>Invoice for</h3>
            <p className='font-bold uppercase'>
              {invoiceData?.customer_company || "N/A"}
            </p>
            <p>+91 {invoiceData?.customer_phone || "xxxxxxxxxx"}</p>
            <p className='font-bold'>
              GSTIN: {invoiceData?.customer_gst || "-"}
            </p>
            <p>{invoiceData?.customer_name || "-"}</p>
            <p>PAN: {invoiceData?.pannumber || "-"}</p>
            <p>PAN Code: {invoiceData?.pancode || "-"}</p>
            <p>{invoiceData?.customerEmail || "-"}</p>
          </div>
          <div className='w-1/3'>
            <h3 className='text-sm font-bold mb-2'>Payable to</h3>
            <p>Ecomm11</p>
            <p>11 Years of Success</p>
          </div>
          <div className='w-1/3'>
            <h3 className='text-sm font-bold mb-2'>Invoice #</h3>
            <p>{invoiceData?.invoice_no || "-"}</p>
            <h3 className='text-sm font-bold mt-2 mb-1'>Project</h3>
            <p>{invoiceData?.project_name || "-"}</p>
            <h3 className='text-sm font-bold mt-2 mb-1'>Due date</h3>
            <p>{formatDate(invoiceData?.due_date)}</p>
          </div>
        </div>

        <table
          className='w-full border-collapse mb-6 mt-4'
          style={{borderSpacing: 0}}
        >
          <thead>
            <tr>
              <th className='bg-gray-200 text-left p-3 border border-gray-300'>
                Description
              </th>
              <th className='bg-gray-200 text-left p-3 border border-gray-300'>
                Month
              </th>
              <th className='bg-gray-200 text-left p-3 border border-gray-300'>
                Monthly price
              </th>
              <th className='bg-gray-200 text-left p-3 border border-gray-300'>
                Total price
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.items?.map((item, index) => (
              <tr key={index}>
                <td className='p-3 border border-gray-300'>
                  {item?.description || "N/A"}
                </td>
                <td className='p-3 border border-gray-300'>
                  {item?.month || "N/A"}
                </td>
                <td className='p-3 border border-gray-300 text-right'>
                  ₹ {item?.monthly_price || "N/A"}
                </td>
                <td className='p-3 border border-gray-300 text-right'>
                  ₹ {item?.month * item?.monthly_price || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='bg-gray-200 p-3 mb-6 mt-4'>
          <h4 className='mb-2 font-bold'>Terms & Conditions:</h4>
          <p>
            {invoiceData?.termsAndConditions?.trim()
              ? invoiceData.termsAndConditions
              : "Clients must provide all product details, product images, or the listings. We are not responsible for any copyright issues."}
          </p>

          <h4 className='mb-2 font-bold mt-4'>Notes:</h4>
          <p>
            {invoiceData?.notes?.trim()
              ? invoiceData.notes
              : "Clients must provide all product details, product images, or the listings. We are not responsible for any copyright issues."}
          </p>
        </div>

        {invoiceData?.discountType && invoiceData?.discountValue && (
          <div className='text-right mb-2 mt-4'>
            <span className='ml-5 font-bold'>
              Discount:{" "}
              {invoiceData.discountType === "percent"
                ? `${invoiceData.discountValue}%`
                : `₹${invoiceData.discountValue}`}
            </span>
          </div>
        )}

        <div className='text-right mb-5 mt-2'>
          <span className='text-yellow-500 font-bold'>
            GST ({invoiceData?.tax_percent || 0}%)
          </span>
          <span className='ml-5 font-bold'>₹ {gstAmount}</span>
        </div>
        <div className='text-right mb-2 mt-4'>
          <span className='ml-5 font-bold'>
            Subtotal: ₹ {invoiceData?.total_amount || 0.0}
          </span>
        </div>

        <div className='flex justify-between mt-6'>
          <div className='border border-gray-300 p-3 w-1/2 mr-2'>
            <h3 className='text-center font-bold mb-2'>Payment Details</h3>
            <p>
              <strong>ACCOUNT HOLDER NAME:</strong> ECOMM VYAPARVANI MISSION
            </p>
            <p>
              <strong>ACCOUNT BRANCH:</strong> JANAKPURAM
            </p>
            <p>
              <strong>ACCOUNT NO.:</strong> 50200291570106
            </p>
            <p>
              <strong>IFSC CODE:</strong> HDFC0001908
            </p>
          </div>
          <div className='border-2 border-black p-3 w-1/2 ml-2 text-right'>
            <p className='font-bold'>Total Payable (Incl. GST)</p>
            <h2 className='text-2xl font-bold mt-2'>₹ {finalPayable}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate1;
