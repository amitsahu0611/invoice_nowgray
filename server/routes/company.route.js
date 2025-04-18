/** @format */

const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} = require("../controllers/company.controller");
const logMiddleware = require("../utils/log");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/createCompany", verifyToken, logMiddleware, createCompany);
router.get("/getAllCompanies", verifyToken, logMiddleware, getAllCompanies);
router.get("/getCompanyById/:id", verifyToken, logMiddleware, getCompanyById);
router.put("/updateCompany/:id", verifyToken, logMiddleware, updateCompany);

module.exports = router;
