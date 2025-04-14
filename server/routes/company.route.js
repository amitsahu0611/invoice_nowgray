/** @format */

const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");
const upload = require("../middlewares/multer");
const router = express.Router();

router.post("/createCompany", upload.single("company_logo"), createCompany);
router.get("/getAllCompany", getAllCompanies);
router.get("/getcompanybyID/:id", getCompanyById);
router.put("/updateCompany/:id", upload.single("company_logo"), updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);

module.exports = router;
