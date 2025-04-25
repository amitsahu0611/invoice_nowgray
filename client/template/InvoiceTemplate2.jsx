/** @format */

import React, {useEffect} from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {Base_URL, forImage} from "../utils/config";

const InvoiceTemplate2 = ({invoiceData, download}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the string
    const options = {year: "numeric", month: "long", day: "numeric"}; // Format options
    return date.toLocaleDateString("en-GB", options); // Return formatted date
  };
  const downloadPDF = () => {
    const input = document.getElementById("invoice-content");

    // Set a fixed width for better scaling
    const originalWidth = input.offsetWidth;
    const originalHeight = input.offsetHeight;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: originalWidth,
      height: originalHeight,
    }).then((canvas) => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > pageHeight - 20) {
        const scaleFactor = (pageHeight - 20) / imgHeight;
        const scaledWidth = imgWidth * scaleFactor;

        pdf.addImage(imgData, "PNG", 10, 10, scaledWidth, pageHeight - 20);
      } else {
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      }

      pdf.save(`invoice-${invoiceData?.invoice_no || "download"}.pdf`);
    });
  };

  useEffect(() => {
    if (download) {
      downloadPDF();
    }
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
          padding: "5mm",
          boxSizing: "border-box",
          fontSize: "12pt",
        }}
      >
        {/* Header */}
        <div className='bg-blue-900 h-4 w-full'></div>
        <div className='flex justify-between p-6'>
          <div className='text-[#92D14F]'>
            <h1 className='text-2xl font-bold'>Nowgray It Services Pvt Ltd</h1>
            <p className='text-sm text-gray-600'>
              Ground Floor, 798, Manas Enclave, Indira Nagar
            </p>
            <p className='text-sm text-gray-600'>
              Lucknow, Uttar Pradesh, 226016
            </p>
            <p className='text-sm text-gray-600'>
              info@nowgray.com, +91 888 136 1111
            </p>
          </div>
          {/* <div className='w-32 h-20 bg-gray-200 flex items-center justify-center'>
            <img src={`${forImage}/logo/Nowgray.png`} alt='Nowgray' />
          </div> */}

          <div className='flex justify-end mt-0'>
            <img
              style={{width: "35%"}}
              src={`${forImage}/logo/Nowgray.png`}
              alt='Nowgray'
              onLoad={() => console.log("Image loaded")}
            />
          </div>
        </div>

        {/* GSTIN */}
        <div className='px-6'>
          <p className='text-sm text-gray-600'>GSTIN: 09AAFCN9228H1Z4</p>
        </div>

        {/* Invoice Title */}
        <div className='text-4xl text-blue-900 font-bold text-center my-6'>
          Invoice
        </div>
        <div className='text-sm text-gray-600 text-center mb-6'>
          Submitted on {formatDate(invoiceData?.issue_date)}
        </div>

        {/* Invoice Details */}
        <div className='flex justify-between px-6'>
          <div className='w-1/3'>
            <h3 className='text-gray-600 font-semibold text-sm'>Invoice for</h3>
            <p className='text-sm font-bold'>
              {" "}
              {invoiceData?.customer_company || "N/A"}
            </p>
            <p className='text-sm'>
              +91 {invoiceData?.customer_phone || "xxxxxxxxxx"}
            </p>
            <p className='text-sm'>
              GSTIN: {invoiceData?.customer_gst || "N/A"}
            </p>
            <p className='text-sm'>
              Floor No.: {invoiceData?.houseNo || "N/A"}
            </p>
            <p className='text-sm'>
              Road/Street: {invoiceData?.roadStreet || "N/A"}
            </p>
            <p className='text-sm'>
              City/Town/Village: {invoiceData?.city || "N/A"}
            </p>
            <p className='text-sm'>
              District: {invoiceData?.district || "N/A"}
            </p>
          </div>
          <div className='w-1/3'>
            <h3 className='text-gray-600 font-semibold text-sm'>Payable to</h3>
            <p className='text-sm'>Nowgray It Services Pvt Ltd</p>
          </div>
          <div className='w-1/3'>
            <h3 className='text-gray-600 font-semibold text-sm'>Invoice #</h3>
            <p className='text-sm'>NG{invoiceData?.invoice_no}</p>
            <h3 className='text-gray-600 font-semibold text-sm mt-4'>
              Due date
            </h3>
            <p className='text-sm'>
              {formatDate(invoiceData?.due_date) || "N/A"}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className='px-6 mt-6'>
          <h3 className='text-gray-600 text-sm font-semibold'>Services</h3>
          <p className='text-sm'>{invoiceData?.project_name || "N/A"}</p>
          <p className='text-sm'>(Powered by Nowgray.com)</p>
        </div>

        {/* Invoice Table */}
        <div className='px-6 mt-6'>
          <table className='w-full table-auto border-collapse'>
            <thead>
              <tr>
                <th className='bg-gray-100 text-left p-2 text-blue-900 text-sm'>
                  Description
                </th>
                <th className='bg-gray-100 text-left p-2 text-blue-900 text-sm'>
                  Month
                </th>
                <th className='bg-gray-100 text-right p-2 text-blue-900 text-sm'>
                  Monthly Price
                </th>
                <th className='bg-gray-100 text-right p-2 text-blue-900 text-sm'>
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData &&
                invoiceData?.items?.map((items, index) => (
                  <tr key={index}>
                    <td className='p-2 border-b border-gray-200'>
                      {items?.description || "N/A"}
                    </td>
                    <td className='p-2 border-b border-gray-200'>
                      {items?.month || "N/A"}
                    </td>
                    <td className='p-2 border-b border-gray-200 text-right'>
                      ₹ {items?.monthly_price || "N/A"}
                    </td>
                    <td className='p-2 border-b border-gray-200 text-right'>
                      ₹ {items?.month * items?.monthly_price || "N/A"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className='flex justify-between px-6 mt-6'>
          <div className='w-3/5 text-sm'>
            <p>
              {invoiceData?.termsAndConditions?.trim()
                ? invoiceData.termsAndConditions
                : "Clients must provide all product details, product images, or the listings. We are not responsible for any copyright issues."}
            </p>
          </div>
          <div className='w-2/5'>
            <table className='w-full'>
              {invoiceData?.discountType && invoiceData?.discountValue && (
                <tr>
                  <td className='text-sm'>Discount</td>
                  <td className='text-sm text-right'>
                    {invoiceData.discountType === "percent"
                      ? `${invoiceData.discountValue}%`
                      : `₹${invoiceData.discountValue}`}
                  </td>
                </tr>
              )}
              <tr>
                <td className='text-sm'>GST ({invoiceData?.tax_percent}%)</td>
                <td className='text-sm text-right'>₹ {gstAmount}</td>
              </tr>
              <tr>
                <td className='text-sm font-semibold'>Total</td>
                <td className='text-sm font-semibold text-right'>
                  ₹
                  {parseInt(invoiceData?.total_amount) +
                    (invoiceData?.tax_percent / 100) *
                      invoiceData?.total_amount || 0.0}
                </td>
              </tr>
            </table>
            <div className='flex justify-between border-t-2 border-blue-900 mt-4 pt-4'>
              <span className='text-blue-900 font-semibold'>Total-</span>
              <span className='text-blue-900 font-semibold'>
                ₹{finalPayable || 0.0}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center text-sm text-gray-600 mt-6'>
          <p>
            Powered by{" "}
            <a href='#' className='text-green-600 font-semibold'>
              Nowgray IT Services
            </a>
            .
          </p>
        </div>
      </div>

      {/* Download Button */}
    </div>
  );
};

export default InvoiceTemplate2;
