/** @format */

const {Op} = require("sequelize");
const Client = require("../models/client.model");
const Company = require("../models/Company.model");
const DownloadLog = require("../models/DownloadLog");
const Invoice = require("../models/Invoice.model");
const Log = require("../models/log.model");
const Payment = require("../models/Payment.model");
const Users = require("../models/users.model");
const {createSuccess} = require("../utils/response");

const paymentReport = async (req, res) => {
  try {
    const payments = await Payment.findAll({order: [["createdAt", "DESC"]]});
    const companies = await Company.findAll({order: [["createdAt", "DESC"]]});
    const users = await Users.findAll({order: [["createdAt", "DESC"]]});

    const grouped = {};

    payments.forEach((payment) => {
      const invoiceId = payment.invoiceId;

      if (!grouped[invoiceId]) {
        grouped[invoiceId] = {
          ...payment.dataValues,
          totalAmountPaidForInvoice: parseFloat(payment.amountPaid),
        };
      } else {
        grouped[invoiceId].totalAmountPaidForInvoice += parseFloat(
          payment.amountPaid
        );
      }
    });

    const allPayments = Object.values(grouped).map((payment) => {
      const company = companies.find((c) => c.company_id === payment.companyId);
      const user = users.find((u) => u.user_id === payment.createdBy);

      const amount = parseFloat(payment.amount || 0);
      const paid = parseFloat(payment.totalAmountPaidForInvoice || 0);
      const leftAmount = amount - paid;

      return {
        ...payment,
        companyName: company ? company.company_name : "Unknown",
        username: user ? user.full_Name : "Unknown",
        leftAmount: leftAmount < 0 ? 0 : leftAmount.toFixed(2),
      };
    });

    res.json(
      createSuccess(
        "Payments grouped by invoice fetched successfully",
        allPayments
      )
    );
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch grouped payments",
      details: error.message,
    });
  }
};

const createDownloadLog = async (req, res) => {
  try {
    const {
      type,
      documentNumber,
      downloadedBy,
      downloaderName,
      downloaderRole,
      downloadedAt,
    } = req.body;

    // Validate required fields
    if (
      !type ||
      !documentNumber ||
      !downloadedBy ||
      !downloaderName ||
      downloaderRole === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newLog = await DownloadLog.create({
      type,
      documentNumber,
      downloadedBy,
      downloaderName,
      downloaderRole,
      downloadedAt, // optional, defaults to NOW if not passed
    });

    res.status(201).json({
      success: true,
      message: "Log created successfully",
      data: newLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllDownloadLogs = async (req, res) => {
  const {start} = req.params;
  try {
    const logs = await DownloadLog.findAll({
      order: [["downloadedAt", "DESC"]],
      ...(Number.isNaN(Number(start)) || start === undefined
        ? {} // If start is NaN or undefined, no offset/limit
        : {
            offset: (start - 1) * 15,
            limit: 15,
          }),
    });

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve logs",
      error: error.message,
    });
  }
};

const getAllMethodLogs = async (req, res) => {
  const {start} = req.params;
  try {
    const logs = await Log.findAll({
      order: [["createdAt", "DESC"]],

      ...(Number.isNaN(Number(start)) || start === undefined
        ? {} // If start is NaN or undefined, no offset/limit
        : {
            offset: start * 15,
            limit: 15,
          }),
    });

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve logs",
      error: error.message,
    });
  }
};

const reportByCustomer = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: {is_deleted: false},
      raw: true,
    });

    const report = [];

    for (const client of clients) {
      const invoices = await Invoice.findAll({
        where: {client_id: client.client_id},
        raw: true,
      });

      let totalInvoiceAmount = 0;
      let totalPaid = 0;

      const invoiceDetails = [];

      for (const invoice of invoices) {
        const invoiceAmount = parseFloat(invoice.total_amount || 0);
        totalInvoiceAmount += invoiceAmount;

        const payments = await Payment.findAll({
          where: {
            invoiceId: invoice.invoice_id,
            approvedBy: {
              [Op.and]: {
                [Op.ne]: null,
                [Op.ne]: "",
              },
            },
          },
          raw: true,
        });

        const paidAmount = payments.reduce(
          (sum, p) => sum + parseFloat(p.amountPaid || 0),
          0
        );
        totalPaid += paidAmount;

        invoiceDetails.push({
          invoice_id: invoice.invoice_id,
          invoice_no: invoice.invoice_no,
          issue_date: invoice.issue_date,
          total_amount: invoiceAmount,
          paid: paidAmount,
          balance: invoiceAmount - paidAmount,
          payments: payments.map((p) => ({
            payment_id: p.payment_id,
            amountPaid: parseFloat(p.amountPaid),
            method: p.method,
            description: p.description,
            createdAt: p.createdAt,
          })),
        });
      }

      report.push({
        client_id: client.client_id,
        client_name: client.client_name,
        client_email: client.client_email,
        client_phone: client.client_phone,
        total_invoices: invoices.length,
        total_invoice_amount: totalInvoiceAmount,
        total_paid: totalPaid,
        total_due: totalInvoiceAmount - totalPaid,
        invoices: invoiceDetails,
      });
    }

    res.json({success: true, data: report});
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

module.exports = {
  paymentReport,
  createDownloadLog,
  getAllDownloadLogs,
  getAllMethodLogs,
  reportByCustomer,
};
