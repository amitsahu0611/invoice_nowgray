/** @format */

const express = require("express");
const {
  createPayment,
  updatePayment,
  getPaymentById,
  approvePayment,
  getAllPayments,
  getMonthlyPaymentSummary,
} = require("../controllers/Payment.controller");
const logMiddleware = require("../utils/log");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/createPayment", verifyToken, logMiddleware, createPayment);
router.put("/updatePayment/:id", verifyToken, logMiddleware, updatePayment);
router.get("/getPaymentById/:id", verifyToken, logMiddleware, getPaymentById);
router.get("/getAllPayment", verifyToken, logMiddleware, getAllPayments);
router.get("/getMonthlyPaymentSummary", getMonthlyPaymentSummary);

router.put(
  "/approve/:payment_id/:approvedBy",
  verifyToken,
  logMiddleware,
  approvePayment
);

module.exports = router;
