/** @format */

const {Sequelize} = require("sequelize");
const Invoice = require("../models/Invoice.model");
const InvoiceItems = require("../models/InvoiceItem.model");
const Payment = require("../models/Payment.model");
const {createSuccess} = require("../utils/response");

const getAllInvoices = async (req, res) => {
  try {
    const {start} = req.params;
    const invoices = await Invoice.findAll({
      ...(Number.isNaN(Number(start)) || start === undefined
        ? {} // If start is NaN or undefined, no offset/limit
        : {
            offset: (start - 1) * 15,
            limit: 15,
          }),
    });

    const invoicesWithPayments = [];

    for (let invoice of invoices) {
      const payments = await Payment.findAll({
        where: {invoiceId: invoice.invoice_id},
        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("amountPaid")), "totalPaid"],
        ],
        raw: true,
      });

      const totalPaid = payments[0] ? payments[0].totalPaid : 0;

      invoicesWithPayments.push({
        ...invoice.dataValues,
        totalPaid,
      });
    }

    res.status(200).json({
      success: true,
      data: invoicesWithPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch invoices with payment data",
      error: error.message,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.invoiceId);

    if (!invoice) {
      return res.status(404).json({error: "Invoice not found"});
    }

    const invoiceItems = await InvoiceItems.findAll({
      where: {invoice_id: req.params.invoiceId},
    });

    invoice.dataValues.invoice_items = invoiceItems.map((item) => {
      const {
        item_id,
        invoice_id,
        description,
        month,
        monthly_price,
        total_price,
      } = item.dataValues;
      return {
        item_id,
        invoice_id,
        description,
        month,
        monthly_price,
        total_price,
      };
    });

    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res
      .status(500)
      .json({error: "Failed to fetch invoice", details: error.message});
  }
};

// const getInvoiceById = async (req, res) => {
//   try {
//     const invoice = await Invoice.findByPk(req.params.invoiceId);

//     if (!invoice) {
//       return res.status(404).json({error: "Invoice not found"});
//     }

//     const invoiceItems = await InvoiceItems.findAll({
//       where: {invoice_id: req.params.invoiceId},
//     });

//     const payments = await Payment.findAll({
//       where: {invoiceId: req.params.invoiceId},
//       attributes: [
//         [Sequelize.fn("SUM", Sequelize.col("amountPaid")), "totalPaid"],
//       ],
//       raw: true,
//     });

//     const totalPaid = payments[0] ? payments[0].totalPaid : 0;

//     invoice.dataValues.invoice_items = invoiceItems.map((item) => {
//       const {
//         item_id,
//         invoice_id,
//         description,
//         month,
//         monthly_price,
//         total_price,
//       } = item.dataValues;
//       return {
//         item_id,
//         invoice_id,
//         description,
//         month,
//         monthly_price,
//         total_price,
//       };
//     });

//     invoice.dataValues.totalPaid = totalPaid;

//     res.status(200).json(invoice);
//   } catch (error) {
//     console.error("Error fetching invoice:", error);
//     res
//       .status(500)
//       .json({error: "Failed to fetch invoice", details: error.message});
//   }
// };

const updateInvoice = async (req, res) => {
  try {
    const id = req.params.invoiceId;
    const invoice = await Invoice.findByPk(req.params.invoiceId);
    if (!invoice) {
      return res.status(404).json({error: "Invoice not found"});
    }

    const items = req.body.items;

    if (Array.isArray(items) && items?.length > 0) {
      await InvoiceItems.destroy({where: {invoice_id: id}});

      await Promise.all(
        items.map((item) =>
          InvoiceItems.create({
            ...item,
            invoice_id: id,
          })
        )
      );
    }

    const updated = await invoice.update(req.body);
    const updatedItems = await InvoiceItems.findAll({
      where: {invoice_id: id},
    });
    res
      .status(200)
      .json(
        createSuccess("Invoice updated successfully", {updated, updatedItems})
      );
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to update invoice", details: error.message});
  }
};

// Download invoice (track who downloaded)
const downloadInvoice = async (req, res) => {
  const {invoiceId} = req.params;
  const {userId} = req.body;

  if (!userId) {
    return res.status(400).json({error: "User ID is required"});
  }

  try {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({error: "Invoice not found"});
    }

    let downloadedByIds = invoice.downloadedByIds || [];
    if (!downloadedByIds.includes(userId)) {
      downloadedByIds.push(userId);
      await invoice.update({downloadedByIds});
    }

    res.status(200).json({message: "Download tracked", downloadedByIds});
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to track download", details: error.message});
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  downloadInvoice,
};
