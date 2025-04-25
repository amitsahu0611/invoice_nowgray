/** @format */

const Company = require("../models/Company.model");
const {createSuccess} = require("../utils/response");

// Create Company
const createCompany = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const company = await Company.create({
      company_name: req.body.name,
      company_email: req.body.email,
      company_phone: req.body.phone,
      company_address: req.body.address,
      company_prefix: req.body.prefix,
      gst: req.body.gst,
      website: req.body.website,
      color: req.body.color,
      bgColor: req.body.bgColor,
      status: req.body.status,
    });

    if (company) {
      res.json(createSuccess("Company created successfully", company));
    } else {
      res.json(createError("Error got"));
    }
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const getAllCompanies = async (req, res) => {
  const {start} = req.params;

  try {
    const companies = await Company.findAll({
      ...(Number.isNaN(Number(start)) || start === undefined
        ? {}
        : {
            offset: (start - 1) * 15,
            limit: 15,
          }),
    });
    res.json(companies);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// Get Company by ID
const getCompanyById = async (req, res) => {
  try {
    const {id} = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({error: "Company not found"});
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// Update Company
const updateCompany = async (req, res) => {
  try {
    const {id} = req.params;
    const [updated] = await Company.update(
      {
        company_name: req.body.name,
        company_email: req.body.email,
        company_phone: req.body.phone,
        company_address: req.body.address,
        company_prefix: req.body.company_prefix,
        gst: req.body.gst,
        website: req.body.website,
        color: req.body.color,
        bgColor: req.body.bgColor,
        status: req.body.status,
      },
      {
        where: {company_id: id},
      }
    );

    if (updated === 0) {
      return res.status(404).json({error: "Company not found or no changes"});
    }

    const updatedCompany = await Company.findByPk(id);
    res.json(createSuccess("Company updated successfully", updatedCompany));
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {
  updateCompany,
  getCompanyById,
  getAllCompanies,
  createCompany,
};
