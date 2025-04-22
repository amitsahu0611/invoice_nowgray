/** @format */

const express = require("express");
const {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
} = require("../controllers/quotation.controller");
const {
  approvedQuotation,
} = require("../controllers/ApproveQuotation.controller");
const logMiddleware = require("../utils/log");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/createQuotation", verifyToken, logMiddleware, createQuotation);
router.get("/getAllQuotations", verifyToken, logMiddleware, getAllQuotations);
router.get(
  "/getQuotationById/:id",
  verifyToken,
  logMiddleware,
  getQuotationById
);
router.put("/updateQuotation/:id", verifyToken, logMiddleware, updateQuotation);
router.post(
  "/approveQuotation/:id",
  verifyToken,
  logMiddleware,
  approvedQuotation
); // Assuming you have this function in your controller

module.exports = router;
