/** @format */

const CompanyInfos = require("../models/Company.model");

const createCompany = async (req, res) => {
  try {
    const {company_name, company_email, company_phone, company_address} =
      req.body;

    const logoPath = req.file ? req.file.path : null;

    const newCompany = await CompanyInfos.create({
      company_name,
      company_logo: logoPath,
      company_email,
      company_phone,
      company_address,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: newCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyInfos.findAll({
      where: {is_deleted: false},
    });
    res.status(200).json({success: true, data: companies});
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"});
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await CompanyInfos.findByPk(req.params.id);
    if (!company || company.is_deleted)
      return res.status(404).json({success: false, message: "Not found"});

    res.status(200).json({success: true, data: company});
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"});
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await CompanyInfos.findByPk(req.params.id);
    if (!company || company.is_deleted)
      return res.status(404).json({success: false, message: "Not found"});

    const updatedData = req.body;
    if (req.file) {
      updatedData.company_logo = req.file.path;
    }

    await company.update(updatedData);
    res
      .status(200)
      .json({success: true, message: "Company updated", data: company});
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"});
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await CompanyInfos.findByPk(req.params.id);
    if (!company || company.is_deleted)
      return res.status(404).json({success: false, message: "Not found"});

    await company.update({is_deleted: true});

    res.status(200).json({success: true, message: "Company deleted"});
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"});
  }
};

module.exports = {
  createCompany,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
};
