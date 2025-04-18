/** @format */

const Company = require("../models/Company.model");
const Payment = require("../models/Payment.model");
const Users = require("../models/users.model");
const {createSuccess} = require("../utils/response");

const createPayment = async (req, res) => {
  try {
    const {companyId, invoiceId, amount, amountPaid, description, method} =
      req.body;

    if (!companyId || !invoiceId || !amount || !amountPaid) {
      return res.status(400).json({error: "Missing required fields."});
    }

    const payment = await Payment.create({
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

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({order: [["createdAt", "DESC"]]});
    const companies = await Company.findAll({order: [["createdAt", "DESC"]]});
    const user = await Users.findAll({order: [["createdAt", "DESC"]]});

    console.log("user", user[0]);

    const allPayments = payments?.map((payment) => {
      const company = companies.find(
        (company) => company.company_id === payment.companyId
      );
      const username = user.find(
        (user) => parseInt(user.company_id) === parseInt(payment.companyId)
      ).full_Name;

      console.log("username", username);
      return {
        ...payment.dataValues,
        companyName: company ? company.company_name : "Unknown",
        username: username ? username : "Unknown",
      };
    });

    res.json(createSuccess("Payments fetched successfully", allPayments));
  } catch (error) {
    res
      .status(500)
      .json({error: "Failed to fetch payments", details: error.message});
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
};
