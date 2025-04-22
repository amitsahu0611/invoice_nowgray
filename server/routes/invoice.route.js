/** @format */

const express = require("express");
const {
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  downloadInvoice,
} = require("../controllers/invoice.controller");
const logMiddleware = require("../utils/log");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.get("/allInvoices", verifyToken, logMiddleware, getAllInvoices);
router.get(
  "/getInvoiceById/:invoiceId",
  verifyToken,
  logMiddleware,
  getInvoiceById
);
router.put(
  "/updateInvoice/:invoiceId",
  verifyToken,
  logMiddleware,
  updateInvoice
);
router.post(
  "/downloadInvoice/:invoiceId",
  verifyToken,
  logMiddleware,
  downloadInvoice
);

module.exports = router;
