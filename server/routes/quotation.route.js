/** @format */

const express = require("express");
const {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
} = require("../controllers/quotation.controller");
const router = express.Router();

router.post("/createQuotation", createQuotation);
router.get("/getAllQuotations", getAllQuotations);
router.get("/getQuotationById/:id", getQuotationById);
router.put("/updateQuotation/:id", updateQuotation);

module.exports = router;
