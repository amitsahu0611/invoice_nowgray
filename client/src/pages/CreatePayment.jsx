/** @format */

import React, {useState, useEffect} from "react";

const dummyCompanies = [
  {id: 1, name: "Alpha Corp"},
  {id: 2, name: "Beta Ltd"},
];

const dummyInvoices = {
  1: [
    {id: "INV-101", amount: 1000},
    {id: "INV-102", amount: 1500},
  ],
  2: [
    {id: "INV-201", amount: 2000},
    {id: "INV-202", amount: 2500},
  ],
};

const CreatePayment = ({onSubmit}) => {
  const [form, setForm] = useState({
    companyId: "",
    invoiceId: "",
    amount: "",
    description: "",
    amountPaid: "",
    method: "Cash",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({...prev, [field]: value}));
  };

  useEffect(() => {
    if (form.companyId && form.invoiceId) {
      const selectedInvoice = dummyInvoices[form.companyId]?.find(
        (inv) => inv.id === form.invoiceId
      );
      handleChange("amount", selectedInvoice?.amount || "");
    }
  }, [form.invoiceId, form.companyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {companyId, invoiceId, amount, amountPaid, description, method} =
      form;
    if (
      companyId &&
      invoiceId &&
      amount &&
      amountPaid &&
      description &&
      method
    ) {
      console.log("Payment Submitted: ", form);
      if (onSubmit) onSubmit(form);
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <div className='w-full max-w-8xl mx-auto mt-10 shadow-lg p-8 bg-white rounded-lg'>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        {/* Company Selection */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Select Company
          </label>
          <select
            value={form.companyId}
            onChange={(e) => handleChange("companyId", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            <option value=''>-- Select Company --</option>
            {dummyCompanies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Invoice Selection */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Select Invoice
          </label>
          <select
            value={form.invoiceId}
            onChange={(e) => handleChange("invoiceId", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
            disabled={!form.companyId}
          >
            <option value=''>-- Select Invoice --</option>
            {(dummyInvoices[form.companyId] || []).map((invoice) => (
              <option key={invoice.id} value={invoice.id}>
                {invoice.id}
              </option>
            ))}
          </select>
        </div>

        {/* Amount (auto-filled) */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Invoice Amount
          </label>
          <input
            type='number'
            value={form.amount}
            readOnly
            className='border border-gray-300 rounded-md px-3 py-2 bg-gray-100'
          />
        </div>

        {/* Amount Paid */}
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Amount Paid
          </label>
          <input
            type='number'
            placeholder='Enter Amount Paid'
            value={form.amountPaid}
            onChange={(e) => handleChange("amountPaid", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Description */}
        <div className='md:col-span-2 flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Payment Description
          </label>
          <textarea
            placeholder='Enter description'
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        {/* Payment Method */}
        <div className='md:col-span-2 flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Payment Method
          </label>
          <select
            value={form.method}
            onChange={(e) => handleChange("method", e.target.value)}
            required
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            <option value='Cash'>Cash</option>
            <option value='UPI'>UPI</option>
            <option value='Debit Card'>Debit Card</option>
            <option value='Credit Card'>Credit Card</option>
          </select>
        </div>
      </form>

      {/* Submit Button */}
      <div className='pt-6 text-right'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
        >
          Add Payment
        </button>
      </div>
    </div>
  );
};

export default CreatePayment;
