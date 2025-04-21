/** @format */

import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCompany} from "../redux/slice/company.slice";
import {getAllInvoices} from "../redux/slice/invoice.slice";
import {createPayment, updatePayment} from "../redux/slice/payment.slice";
import {showError, showSuccess} from "../../utils/config";

const CreatePayment = ({setActiveTab}) => {
  const dispatch = useDispatch();
  const [allCompanies, setAllCompanies] = useState([]);
  const [invoices, setAllInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({
    companyId: "",
    invoiceId: "",
    amount: "",
    description: "",
    amountPaid: 0,
    method: "Cash", // default method set to "Cash"
    totalPaid: "",
  });

  const companies = useSelector((state) => state.company.allCompanies);
  const allInvoices = useSelector((state) => state.invoice.allInvoices);
  const singleInvoice = useSelector((state) => state.payment.singlePayment);

  console.log("singleInvoice", singleInvoice);

  useEffect(() => {
    dispatch(getAllCompany());
  }, []);

  useEffect(() => {
    if (singleInvoice) {
      setForm((prev) => ({
        ...prev,
        companyId: singleInvoice.companyId,
        invoiceId: singleInvoice.invoiceId,
        amount: singleInvoice.amount,
        amountPaid: singleInvoice.amountPaid,
        description: singleInvoice.description,
        method: singleInvoice.method, // Fallback to Cash if undefined
      }));
      setUpdate(true);
    }
  }, [singleInvoice]);

  useEffect(() => {
    dispatch(getAllInvoices());
  }, []);

  useEffect(() => {
    if (
      form.companyId != null &&
      form.companyId !== "" &&
      invoices?.length > 0
    ) {
      const filteredInvoices = invoices.filter(
        (data) => data.company_id == form.companyId
      );
      setFilteredInvoices(filteredInvoices);
    }
  }, [form.companyId]);

  useEffect(() => {
    if (companies?.length > 0) {
      setAllCompanies(companies);
    }
  }, [companies]);

  useEffect(() => {
    if (allInvoices?.length > 0) {
      setAllInvoices(allInvoices);
    }
  }, [allInvoices]);

  useEffect(() => {
    const selectedInvoice = allInvoices?.find(
      (invoice) => invoice.invoice_id == form.invoiceId
    );
    setForm((prev) => ({
      ...prev,
      amount: selectedInvoice ? selectedInvoice.total_amount : "",
      totalPaid: selectedInvoice ? selectedInvoice.totalPaid : "",
    }));
  }, [form?.invoiceId]);

  useEffect(() => {
    if (form.amountPaid > form.amount - form.totalPaid) {
      showError("Amount cannot be greater than Amount to be paid");
    }
  }, [form.amountPaid]);

  const handleChange = (field, value) => {
    console.log("field", field, value);
    setForm((prev) => ({...prev, [field]: value}));
    console.log("form", form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form", form);
    const data = await dispatch(createPayment(form));
    if (data?.payload?.status === 1) {
      setActiveTab("Payment List");
      showSuccess(data?.payload?.message);
      setForm({
        companyId: "",
        invoiceId: "",
        amount: "",
        description: "",
        amountPaid: "",
        method: "Cash",
      });
    } else {
      console.log("error", data?.payload?.error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      updatePayment({data: form, id: singleInvoice.payment_id})
    );
    if (data?.payload?.status === 1) {
      setForm({
        companyId: "",
        invoiceId: "",
        amount: "",
        description: "",
        amountPaid: "",
        method: "Cash",
      });
      setActiveTab("Payment List");
      showSuccess(data?.payload?.message);
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
            {allCompanies?.map((company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.company_name}
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
            {filteredInvoices?.map((invoice) => (
              <option key={invoice.invoice_id} value={invoice.invoice_id}>
                {invoice.invoice_id}
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
            placeholder='0.0'
            readOnly
            className='border border-gray-300 rounded-md px-3 py-2 bg-gray-100'
          />
        </div>

        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-medium text-gray-700'>
            Total Amount Paid
          </label>
          <input
            type='number'
            value={form?.totalPaid}
            placeholder='0.0'
            readOnly
            className='border border-gray-300 rounded-md px-3 py-2 bg-gray-100'
          />
          <span className='text-green-800'>
            Amount to be paid: {form?.amount - form?.totalPaid}
          </span>
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
            value={form.method} // Ensure `method` is properly passed here
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
          className='px-6 py-2 bg-blue-600 text-white rounded-md'
        >
          Create Payment
        </button>
      </div>
    </div>
  );
};

export default CreatePayment;
