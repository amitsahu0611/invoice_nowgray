/** @format */

import React from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {forImage} from "../utils/config";

const InvoiceTemplate3 = ({invoiceData}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the string
    const options = {year: "numeric", month: "long", day: "numeric"}; // Format options
    return date.toLocaleDateString("en-GB", options); // Return formatted date
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

      console.log("ino", invoiceData);
    });
  };

  return (
    <>
      <div>
        <div
          id='invoice-content'
          className='max-w-7xl w-[210mm] h-[297mm] mx-auto p-6 bg-white border-2 border-gray-200'
        >
          {/* Header Line */}
          <div className='h-1 bg-indigo-800 mb-6'></div>

          {/* Header Section */}
          <div className='flex justify-between mb-6'>
            <div className='flex-2'>
              <div className='text-lg font-bold text-green-600'>
                Nowgray It Services Pvt Ltd
              </div>
              <div className='text-xs text-gray-600 mb-2'>
                Ground Floor, 708, Manish Tower, Indira Nagar
              </div>
              <div className='text-xs text-gray-600 mb-2'>
                LUCKNOW, Lucknow, Uttar Pradesh, 226026
              </div>
              <div className='text-xs text-gray-600 mb-2'>
                info@nowgray.com, +91 888 136 1111
              </div>
              <div className='text-xs text-gray-600'>
                GSTIN: 09AAFCN9228H1Z4
              </div>
            </div>
            <div className='flex justify-end mt-0'>
              <img
                style={{width: "35%"}}
                src={`${forImage}/logo/Nowgray.png`}
                alt='Nowgray'
              />
            </div>
          </div>

          {/* Invoice Title */}
          <div className='text-4xl font-bold text-green-600 mb-8'>Invoice</div>

          {/* Invoice Details */}
          <div className='flex justify-between mb-8'>
            <div className='flex-1'>
              <div className='text-sm font-semibold mb-1'>
                Issue Date : {formatDate(invoiceData?.issue_date)}
              </div>
              <div className='text-sm font-semibold mb-1'>
                Due Date : {formatDate(invoiceData?.issue_date)}
              </div>
              <div className='text-sm font-semibold mb-1'>Invoice for</div>
              <div className='text-sm text-gray-600'>
                {invoiceData?.customer_company || "N/A"}
              </div>
              <div className='text-sm text-gray-600'>
                GSTIN: {invoiceData?.customer_gst || "N/A"}
              </div>
              <div className='text-sm text-gray-600'>
                {invoiceData?.houseNo || "N/A"}
              </div>
              <div className='text-sm text-gray-600'>
                {invoiceData?.roadStreet || "N/A"}
              </div>
              <div className='text-sm text-gray-600'>
                {invoiceData?.city || "N/A"} {invoiceData?.district || "N/A"}
              </div>
              <div className='text-sm text-gray-600'>
                +91 {invoiceData?.customer_phone || "xxxxxxxxxx"}
              </div>
            </div>

            <div className='flex-1'>
              <div className='text-sm font-semibold mb-1'>Payable to</div>
              <div className='text-sm text-gray-600'>
                Nowgray It Services Pvt Ltd
              </div>
              <div className='text-sm font-semibold mb-1 mt-4'>Invoice #</div>
              <div className='text-sm text-gray-600'>NG00906</div>
              <div className='text-sm font-semibold mb-1 mt-4'>Project</div>
              <div className='text-sm text-gray-600'>
                Brochure Design Services
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <table className='w-full border-collapse mb-8'>
            <thead>
              <tr className='text-green-600'>
                <th className='text-left p-2'>Description</th>
                <th className='text-left p-2'>Pages</th>
                <th className='text-right p-2'>Monthly Price</th>
                <th className='text-right p-2'>Total Price</th>
              </tr>
            </thead>
            {invoiceData &&
              invoiceData?.items?.map((items) => (
                <tr>
                  <td className='p-2 border-b border-gray-200'>
                    {items?.description || "N/A"}
                  </td>
                  <td className='p-2 border-b border-gray-200'>
                    {" "}
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
          </table>

          {/* Notes */}
          <div className='flex mb-4'>
            <div className='w-20 text-sm font-semibold text-gray-600'>
              Notes:
            </div>
            <div className='flex-1 text-sm text-gray-500'>
              This is the advance payment for designs. Payments are
              non-refundable and follow the agreed schedule.
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className='flex mb-8'>
            <div className='w-20 text-sm font-semibold text-gray-600'>
              Terms & Conditions:
            </div>
            <div className='flex-1 text-sm text-gray-500'>
              Clients must provide all details, images & contents for the
              designs. We are not responsible for any copyright claims on
              provided materials.
            </div>
          </div>

          {/* Totals Section */}
          <div className='flex justify-end mb-8'>
            <div className='w-80'>
              <div className='flex justify-between py-2'>
                <div className='text-sm text-green-600'>Subtotal</div>
                <div className='text-sm text-right'>
                  ₹{invoiceData?.total_amount || 0.0}
                </div>
              </div>
              <div className='flex justify-between py-2'>
                <div className='text-sm text-green-600'>
                  GST ({invoiceData?.tax_percent}%)
                </div>
                <div className='text-sm text-right'>
                  {" "}
                  ₹{" "}
                  {(invoiceData?.tax_percent / 100) *
                    invoiceData?.total_amount || 0.0}
                </div>
              </div>
              <div className='flex justify-between py-2 border-t border-green-600'>
                <div className='text-lg font-bold text-green-600'>Total</div>
                <div className='text-lg font-bold text-right text-green-600'>
                  ₹{" "}
                  {parseInt(invoiceData?.total_amount) +
                    (invoiceData?.tax_percent / 100) *
                      invoiceData?.total_amount || 0.0}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-6'>
          <button
            onClick={downloadPDF}
            className='bg-green-600 text-white py-2 px-6 rounded-md font-semibold'
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate3;
