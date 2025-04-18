/** @format */

const Company = require("../models/Company.model");
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
    const {type, documentNumber, downloadedBy, downloaderName} = req.body;

    if (!type || !documentNumber || !downloadedBy || !downloaderName) {
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

// GET - Get all logs
const getAllDownloadLogs = async (req, res) => {
  try {
    const logs = await DownloadLog.findAll({
      order: [["downloadedAt", "DESC"]],
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

module.exports = {
  paymentReport,
  createDownloadLog,
  getAllDownloadLogs,
};
