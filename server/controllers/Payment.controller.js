/** @format */

const {Op} = require("sequelize");
const Company = require("../models/Company.model");
const Invoice = require("../models/Invoice.model");
const Payment = require("../models/Payment.model");
const Users = require("../models/users.model");
const {createSuccess} = require("../utils/response");
const Quotation = require("../models/Quotation.model");
const DownloadLog = require("../models/DownloadLog");

const createPayment = async (req, res) => {
  try {
    const {
      companyId,
      invoiceId,
      amount,
      amountPaid,
      description,
      method,
      createdBy,
    } = req.body;

    if (!companyId || !invoiceId || !amount || !amountPaid) {
      return res.status(400).json({error: "Missing required fields."});
    }

    const invoice = await Invoice.findOne({
      where: {
        invoice_id: invoiceId,
      },
    });

    const payment = await Payment.create({
      client_id: invoice.client_id,
      createdBy,
      companyId,
      invoiceId,
      amount,
      amountPaid,
      description,
      method,
    });

    res
      .status(201)
      .json(createSuccess("Payment created successfully", payment));
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to create payment", details: error.message});
  }
};

const updatePayment = async (req, res) => {
  try {
    const {id} = req.params;
    const updated = await Payment.update(req.body, {where: {payment_id: id}});

    if (updated[0] === 0) {
      return res.status(404).json({error: "Payment not found"});
    }

    res.json(createSuccess("Payment updated successfully", updated));
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to update payment", details: error.message});
  }
};

const getPaymentById = async (req, res) => {
  try {
    const {id} = req.params;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({error: "Payment not found"});
    }

    res.json(createSuccess("Payment fetched successfully", payment));
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch payment", details: error.message});
  }
};

// const getAllPayments = async (req, res) => {
//   const {start} = req.params;
//   try {
//     const payments = await Payment.findAll({
//       order: [["createdAt", "DESC"]],
//       ...(Number.isNaN(Number(start)) || start === undefined
//         ? {}
//         : {
//             offset: (start - 1) * 15,
//             limit: 15,
//           }),
//     });
//     const companies = await Company.findAll({order: [["createdAt", "DESC"]]});
//     const user = await Users.findAll({order: [["createdAt", "DESC"]]});
//     console.log("payments", payments, user);

//     const allPayments = payments?.map((payment) => {
//       const company = companies.find(
//         (company) => company.company_id === payment.companyId
//       );
//       const username = user.find(
//         (user) => parseInt(user.user_id) === parseInt(payment.createdBy)
//       ).full_Name;
//       const approver = user.find(
//         (u) => parseInt(u.dataValues.user_id) === parseInt(payment.approvedBy)
//       );

//       const approverName = approver?.dataValues?.full_Name || "N/A";

//       console.log("approverName:", approverName);

//       console.log("username", username);
//       return {
//         ...payment.dataValues,
//         companyName: company ? company.company_name : "Unknown",
//         username: username ? username : "Unknown",
//         approverName: approverName ? approverName : "Unknown",
//       };
//     });

//     res.json(createSuccess("Payments fetched successfully", allPayments));
//   } catch (error) {
//     res
//       .status(500)
//       .json({error: "Failed to fetch payments", details: error.message});
//   }
// };

const getAllPayments = async (req, res) => {
  const {start} = req.params;

  try {
    const payments = await Payment.findAll({
      order: [["createdAt", "DESC"]],
      ...(Number.isNaN(Number(start)) || start === undefined
        ? {}
        : {
            offset: (start - 1) * 15,
            limit: 15,
          }),
    });

    const companies = await Company.findAll({order: [["createdAt", "DESC"]]});
    const users = await Users.findAll({order: [["createdAt", "DESC"]]});
    const invoices = await Invoice.findAll({order: [["createdAt", "DESC"]]});

    // Now enrich payments
    const allPayments = payments.map((payment) => {
      const paymentData = payment.dataValues;

      const company = companies.find(
        (c) => c.dataValues.company_id === paymentData.companyId
      );

      const createdByUser = users.find(
        (u) =>
          parseInt(u.dataValues.user_id) === parseInt(paymentData.createdBy)
      );

      const approver = users.find(
        (u) =>
          parseInt(u.dataValues.user_id) === parseInt(paymentData.approvedBy)
      );

      const invoice_number = invoices.find(
        (u) =>
          parseInt(u.dataValues.invoice_id) === parseInt(paymentData.invoiceId)
      );

      return {
        ...paymentData,
        companyName: company?.dataValues.company_name || "Unknown",
        username: createdByUser?.dataValues.full_Name || "Unknown",
        approverName: approver?.dataValues.full_Name || "N/A",
        invoice_number: invoice_number?.dataValues?.invoice_no || "N/A",
      };
    });

    return res.json(
      createSuccess("Payments fetched successfully", allPayments)
    );
  } catch (error) {
    console.error("Error in getAllPayments:", error);
    return res.status(500).json({
      error: "Failed to fetch payments",
      details: error.message,
    });
  }
};

const getMonthlyPaymentSummary = async (req, res) => {
  try {
    const activeUsers = await Users.findAll({
      where: {role_id: {[Op.ne]: 0}},
      attributes: ["user_id"],
    });

    const allQuotation = await Quotation.count();
    const allInvoices = await Invoice.count();
    const approvedInvoice = await Invoice.count({
      where: {
        approvedStatus: {
          [Op.ne]: "pending",
        },
      },
    });

    const invoiceDownloaded = await DownloadLog.count({
      where: {
        type: "invoice",
      },
    });

    const allUsers = activeUsers.length;

    const validUserIds = activeUsers.map((user) => user.user_id);

    const payments = await Payment.findAll({
      attributes: ["amountPaid", "createdAt"],
      raw: true,
    });

    const allPayments = await Invoice.findAll({
      order: [["createdAt", "DESC"]],
      attributes: [
        "invoice_no",
        "issue_date",
        "due_date",
        "customer_name",
        "total_amount",
      ],
      raw: true,
      limit: 10,
    });

    const monthlyTotals = Array.from({length: 12}, (_, i) => ({
      month: i + 1,
      totalPaid: 0,
    }));

    payments.forEach((payment) => {
      const month = new Date(payment.createdAt).getMonth(); // 0-indexed
      monthlyTotals[month].totalPaid += parseFloat(payment.amountPaid);
    });

    res.status(200).json({
      success: true,
      monthlyData: monthlyTotals,
      data: {
        allQuotation,
        allInvoices,
        approvedInvoice,
        invoiceDownloaded,
        allUsers,
        validUserIds,
      },
      allPayments,
    });
  } catch (err) {
    console.error("Error getting monthly payment summary:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const approvePayment = async (req, res) => {
  const {payment_id, approvedBy} = req.params;

  try {
    const payment = await Payment.findByPk(payment_id);

    if (!payment) {
      return res.status(404).json({message: "Payment not found"});
    }

    payment.approvedBy = approvedBy;
    const data = await payment.save();

    res.status(200).json(createSuccess("Payment Approved Successfully", data));
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({message: "Internal server error"});
  }
};

module.exports = {
  createPayment,
  updatePayment,
  getPaymentById,
  getAllPayments,
  approvePayment,
  getMonthlyPaymentSummary,
};
