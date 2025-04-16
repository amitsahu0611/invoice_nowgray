/** @format */

import React, {useState} from "react";
import InvoiceTemplate1 from "../../template/InvoiceTemplate1";
import InvoiceTemplate2 from "../../template/InvoiceTemplate2";
import InvoiceTemplate3 from "../../template/InvoiceTemplate3";

const QuotationForm = () => {
  // FormValues logic
  const [formValues, setFormValues] = useState({
    category: "Design Services",
    invoice_no: "NG00906",
    issue_date: "2025-03-26",
    due_date: "2025-04-26",
    project_name: "Brochure Design",
    customer_name: "John Doe",
    customer_phone: "+91 9876543210",
    customer_gst: "09ABCDE1234F1Z5",
    customer_company: "XYZ Enterprises",
    customerEmail: "johndoe@example.com",
    pannumber: "ABCDE1234F",
    pancode: "A1234",
    tax_percent: "18",
    total_amount: "25000",
    gstcalculated: "4500",
    houseNo: "1001",
    roadStreet: "MG Road",
    city: "Chennai",
    district: "Kancheepuram",
    items: [
      {
        description: "Brochure Design - Front Page",
        month: "March 2025",
        monthly_price: "10000",
        total_price: "10000",
      },
      {
        description: "Brochure Design - Inside Pages",
        month: "March 2025",
        monthly_price: "15000",
        total_price: "15000",
      },
    ],
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues((prev) => ({...prev, [name]: value}));
  };

  const handleItemChange = (index, e) => {
    const {name, value} = e.target;
    const updatedItems = [...formValues.items];
    updatedItems[index][name] = value;
    setFormValues((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormValues((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          month: "",
          monthly_price: "",
          total_price: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormValues((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormValues({
      category: "",
      invoice_no: "",
      issue_date: "",
      due_date: "",
      project_name: "",
      customer_name: "",
      customer_phone: "",
      customer_gst: "",
      customer_company: "",
      customerEmail: "",
      pannumber: "",
      pancode: "",
      tax_percent: "",
      total_amount: "",
      gstcalculated: "",
      houseNo: "",
      roadStreet: "",
      city: "",
      district: "",
      items: [],
    });
  };

  // box selection
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const components = [
    <InvoiceTemplate1 invoiceData={formValues} />,
    <InvoiceTemplate2 invoiceData={formValues} />,
    <InvoiceTemplate3 invoiceData={formValues} />,
  ];

  const handlePreview = (index) => {
    setSelectedIndex(index);
    setModalOpen(true); // Open the modal when preview is clicked
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const invoiceUrls = [
    "/firstInvoice.png",
    "/secondInvoice.png",
    "/thirdInvoice.png",
  ];

  const [selectedBox, setSelectedBox] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const handleBoxClick = (e, index) => {
    e.stopPropagation();
    console.log("index", index);
    setSelectedBox(index);
    setSelectedImage(index);
    setIsModalOpen(true);
    setFormValues({...formValues, invoice_patent: index + 1});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
  };

  return (
    <div className='p-8 max-w-8xl mx-auto bg-white rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit}>
        {/* Client Details */}
        <div className='mb-6'>
          <h4 className='font-semibold text-xl mb-4'>Client Details</h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block mb-1'>Customer Name</label>
              <input
                name='customer_name'
                value={formValues.customer_name}
                onChange={handleChange}
                placeholder='Customer Name'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Company</label>
              <input
                name='customer_company'
                value={formValues.customer_company}
                onChange={handleChange}
                placeholder='Company'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Phone</label>
              <input
                name='customer_phone'
                value={formValues.customer_phone}
                onChange={handleChange}
                placeholder='Phone'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Email</label>
              <input
                name='customerEmail'
                value={formValues.customerEmail}
                onChange={handleChange}
                placeholder='Email'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>GST Number</label>
              <input
                name='customer_gst'
                value={formValues.customer_gst}
                onChange={handleChange}
                placeholder='GST Number'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>PAN Number</label>
              <input
                name='pannumber'
                value={formValues.pannumber}
                onChange={handleChange}
                placeholder='PAN Number'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>PAN Code</label>
              <input
                name='pancode'
                value={formValues.pancode}
                onChange={handleChange}
                placeholder='PAN Code'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className='mb-6'>
          <h4 className='font-semibold text-xl mb-4'>Project Details</h4>
          <div>
            <label className='block mb-1'>Project Name</label>
            <input
              name='project_name'
              value={formValues.project_name}
              onChange={handleChange}
              placeholder='Project Name'
              className='border border-gray-300 rounded-md p-2 w-full mb-4'
            />
          </div>
          <div>
            <label className='block mb-1'>Category</label>
            <input
              name='category'
              value={formValues.category}
              onChange={handleChange}
              placeholder='Category'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
        </div>

        {/* Invoice Info */}
        <div className='mb-6'>
          <h4 className='font-semibold text-xl mb-4'>Invoice Info</h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block mb-1'>Invoice No.</label>
              <input
                name='invoice_no'
                value={formValues.invoice_no}
                onChange={handleChange}
                placeholder='Invoice No.'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Issue Date</label>
              <input
                type='date'
                name='issue_date'
                value={formValues.issue_date}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Due Date</label>
              <input
                type='date'
                name='due_date'
                value={formValues.due_date}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Tax %</label>
              <input
                name='tax_percent'
                value={formValues.tax_percent}
                onChange={handleChange}
                placeholder='Tax %'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Total Amount</label>
              <input
                name='total_amount'
                value={formValues.total_amount}
                onChange={handleChange}
                placeholder='Total Amount'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>GST Calculated</label>
              <input
                name='gstcalculated'
                value={formValues.gstcalculated}
                onChange={handleChange}
                placeholder='GST Calculated'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className='mb-6'>
          <h4 className='font-semibold text-xl mb-4'>Address</h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block mb-1'>House No</label>
              <input
                name='houseNo'
                value={formValues.houseNo}
                onChange={handleChange}
                placeholder='House No'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>Road / Street</label>
              <input
                name='roadStreet'
                value={formValues.roadStreet}
                onChange={handleChange}
                placeholder='Road / Street'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>City</label>
              <input
                name='city'
                value={formValues.city}
                onChange={handleChange}
                placeholder='City'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
            <div>
              <label className='block mb-1'>District</label>
              <input
                name='district'
                value={formValues.district}
                onChange={handleChange}
                placeholder='District'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </div>
        </div>

        <div className='mb-6'>
          <h4 className='font-semibold text-xl mb-4'>Discount</h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block mb-1'>Discount Type</label>

              <select
                name='discountType'
                id='discountType'
                value={formValues.discountType}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full'
              >
                <option value=''>--Select--</option>
                <option value='percentage'>Percentage</option>
                <option value='amount'>Amount</option>
              </select>
            </div>
            <div>
              <label className='block mb-1'>Discount Type</label>
              <input
                name='discountValue'
                value={formValues.discountValue}
                onChange={handleChange}
                placeholder='Discount Value'
                className='border border-gray-300 rounded-md p-2 w-full'
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className='mb-6'>
          <h4 className='font-semibold text-xl mb-4'>Items</h4>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='border p-2'>Description</th>
                <th className='border p-2'>Month</th>
                <th className='border p-2'>Monthly Price</th>
                <th className='border p-2'>Total Price</th>
              </tr>
            </thead>
            {/* <tbody>
              {formValues.items.map((item, index) => (
                <tr key={index}>
                  <td className='border p-2'>
                    <input
                      name='description'
                      value={item.description}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Item Description'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2'>
                    <input
                      name='month'
                      value={item.month}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Month'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2'>
                    <input
                      name='monthly_price'
                      value={item.monthly_price}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Monthly Price'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2'>
                    <input
                      name='total_price'
                      value={item.total_price}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Total Price'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                </tr>
              ))}
            </tbody> */}
            <tbody>
              {formValues.items.map((item, index) => (
                <tr key={index}>
                  <td className='border p-2'>
                    <input
                      name='description'
                      value={item.description}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Item Description'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2'>
                    <input
                      name='month'
                      value={item.month}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Month'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2'>
                    <input
                      name='monthly_price'
                      value={item.monthly_price}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Monthly Price'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2'>
                    <input
                      name='total_price'
                      value={item.total_price}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder='Total Price'
                      className='border border-gray-300 rounded-md p-2 w-full'
                    />
                  </td>
                  <td className='border p-2 text-center'>
                    <button
                      type='button'
                      onClick={() => removeItem(index)}
                      className='text-red-500 hover:underline'
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-4 flex justify-end'>
          <button
            type='button'
            onClick={addItem}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            + Add Item
          </button>
        </div>
      </form>

      <div className='flex space-x-4 mt-10'>
        {invoiceUrls.map((url, index) => (
          <div
            key={index}
            className={`relative h-[20vh] w-[20vw] border-2 p-4 rounded-lg cursor-pointer transition-all duration-300 flex justify-center items-center ${
              selectedBox === index ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handleDoAll(index)}
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            {selectedBox === index && (
              <div className='absolute inset-0 bg-white opacity-50'></div>
            )}
            <span className='absolute top-2 right-2 text-green-500'>
              {selectedBox === index && "✔️"}
            </span>
            <div
              onClick={(e) => handleBoxClick(e, index)}
              className='text-center relative z-10 font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded'
            >
              Preview
            </div>
          </div>
        ))}

        {isModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-full max-h-full flex flex-col items-center overflow-hidden'>
              {/* Scrollable Content Area */}
              <div className='overflow-y-auto max-h-[80vh] w-full flex justify-center'>
                <div className='w-full max-w-[800px]'>
                  {selectedImage === 0 && (
                    <InvoiceTemplate1 invoiceData={formValues} />
                  )}
                  {selectedImage === 1 && (
                    <InvoiceTemplate2 invoiceData={formValues} />
                  )}
                  {selectedImage === 2 && (
                    <InvoiceTemplate3 invoiceData={formValues} />
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                className='mt-4 bg-blue-500 text-white px-6 py-2 rounded'
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-row justify-end gap-4'>
        <div className='flex justify-end mt-5'>
          <button
            onClick={handleClear}
            type='button'
            className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200'
          >
            Clear
          </button>
        </div>
        <div className='flex justify-end mt-5'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationForm;
