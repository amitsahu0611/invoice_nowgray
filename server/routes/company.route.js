/** @format */

const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} = require("../controllers/company.controller");
const router = express.Router();

router.post("/createCompany", createCompany);
router.get("/getAllCompanies", getAllCompanies);
router.get("/getCompanyById/:id", getCompanyById);
router.put("/updateCompany/:id", updateCompany);

module.exports = router;
