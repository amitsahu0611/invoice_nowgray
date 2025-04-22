/** @format */

const express = require("express");
const {
  paymentReport,
  createDownloadLog,
  getAllDownloadLogs,
  getAllMethodLogs,
  reportByCustomer,
} = require("../controllers/report.controller");
const logMiddleware = require("../utils/log");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.get("/paymentReport", verifyToken, logMiddleware, paymentReport);
router.post("/createDownloadLog", logMiddleware, createDownloadLog);
router.get(
  "/getAllDownloadLogs",
  verifyToken,
  logMiddleware,
  getAllDownloadLogs
);
router.get("/getAllMethodLogs", verifyToken, logMiddleware, getAllMethodLogs);
router.get("/reportByCustomer", reportByCustomer);

module.exports = router;
