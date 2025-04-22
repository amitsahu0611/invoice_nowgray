/** @format */

const Quotation = require("../models/Quotation.model");
const Invoice = require("../models/Invoice.model");
const {createSuccess} = require("../utils/response");
const InvoiceItems = require("../models/InvoiceItem.model");
const {where} = require("sequelize");
const QuotationItem = require("../models/QuotationItem.model");

const approvedQuotation = async (req, res) => {
  try {
    const {id} = req.params;

    const quotation = await Quotation.findByPk(id);
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    await quotation.update(req.body);

    let newInvoice = null;

    if (req.body.approvedStatus === "approved") {
      const invoiceCount = await Invoice.count();
      const newInvoiceNo = quotation?.invoice_no;

      newInvoice = await Invoice.create({
        client_id: quotation?.client_id || null,
        quotation_id: quotation.quotation_id,
        salesPersonId: quotation.salesPersonId,
        company_id: quotation.company_id,
        category: quotation.category,
        invoice_no: newInvoiceNo,
        issue_date: quotation.issue_date,
        due_date: quotation.due_date,
        project_name: quotation.project_name,
        customer_name: quotation.customer_name,
        customer_phone: quotation.customer_phone,
        customer_gst: quotation.customer_gst,
        customer_company: quotation.customer_company,
        customerEmail: quotation.customerEmail,
        pannumber: quotation.pannumber,
        pancode: quotation.pancode,
        tax_percent: quotation.tax_percent,
        total_amount: quotation.total_amount,
        gstcalculated: quotation.gstcalculated,
        houseNo: quotation.houseNo,
        roadStreet: quotation.roadStreet,
        city: quotation.city,
        district: quotation.district,
        discountType: quotation.discountType,
        discountValue: quotation.discountValue,
        termsAndConditions: quotation.termsAndConditions,
        notes: quotation.notes,
        selectBox: quotation.selectBox,
        approvedStatus: quotation.approvedStatus,
        approvedBy: quotation.approvedBy,
        ApproverCompanyId: quotation.ApproverCompanyId,
        ApproverCompanyName: quotation.ApproverCompanyName,
        approverName: quotation.approverName,
        approvedDate: quotation.approvedDate,
      });

      if (newInvoice.invoice_id) {
        // Create invoice items using quotation items
        const quotationItems = await QuotationItem.findAll({
          where: {
            quotation_id: quotation.quotation_id,
          },
        });
        await Promise.all(
          quotationItems.map((item) =>
            InvoiceItems.create({
              ...item.toJSON(),
              invoice_id: newInvoice.invoice_id,
            })
          )
        );
      }
    }

    res.status(200).json(
      createSuccess("Quotation updated successfully", {
        quotation,
        invoice: newInvoice,
      })
    );
  } catch (error) {
    console.error("Update Quotation Error:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

module.exports = {
  approvedQuotation,
};
