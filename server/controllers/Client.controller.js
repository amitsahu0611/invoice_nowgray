/** @format */

const Client = require("../models/client.model");
const Company = require("../models/Company.model");
const {createError} = require("../utils/response");

const createClient = async (req, res) => {
  try {
    const {client_email} = req.body;
    const existing = await Client.findOne({
      where: {
        client_email,
        is_deleted: false,
      },
    });
    if (existing) {
      return res.json(createError("Email already exists"));
    }
    const client = await Client.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error.message,
    });
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  const {start} = req.params;

  try {
    const clients = await Client.findAll({
      where: {is_deleted: false},
      order: [["createdAt", "DESC"]],
      raw: true,

      ...(Number.isNaN(Number(start)) || start === undefined
        ? {} // If start is NaN or undefined, no offset/limit
        : {
            offset: (start - 1) * 15,
            limit: 15,
          }),
    });

    const companies = await Company.findAll({
      where: {is_deleted: false},
      raw: true,
    });

    // Create a lookup object for faster access with both company_name and company_prefix
    const companyMap = {};
    companies.forEach((company) => {
      companyMap[company.company_id] = {
        company_name: company.company_name,
        company_prefix: company.company_prefix,
      };
    });

    // Add company_name and company_prefix to each client
    const clientsWithCompany = clients.map((client) => ({
      ...client,
      company_name: companyMap[client.company_id]?.company_name || null,
      company_prefix: companyMap[client.company_id]?.company_prefix || null,
    }));

    res.status(200).json({
      success: true,
      data: clientsWithCompany,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
      error: error.message,
    });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const {id} = req.params;
    const client = await Client.findOne({
      where: {client_id: id, is_deleted: false},
    });

    if (!client) {
      return res
        .status(404)
        .json({success: false, message: "Client not found"});
    }

    res.status(200).json({success: true, data: client});
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch client",
      error: error.message,
    });
  }
};

// Update client by ID
const updateClient = async (req, res) => {
  try {
    const {id} = req.params;
    const [updatedRowsCount] = await Client.update(req.body, {
      where: {client_id: id, is_deleted: false},
    });

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({success: false, message: "Client not found or already deleted"});
    }

    const updatedClient = await Client.findOne({where: {client_id: id}});

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
};
