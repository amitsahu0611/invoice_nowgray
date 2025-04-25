/** @format */

const Quotation = require("../models/Quotation.model");
const QuotationItem = require("../models/QuotationItem.model");
const {createSuccess} = require("../utils/response");

const isEmpty = (value) =>
  value === undefined || value === null || value === "";

const createQuotation = async (req, res) => {
  console.log("req.body", req.body);
  //   return;
  try {
    const {
      company_id,
      salesPersonId,
      category,
      invoice_no,
      issue_date,
      due_date,
      customer_name,
      total_amount,
      items = [],
    } = req.body;

    req.body.salesPersonId = salesPersonId;
    req.body.company_id = company_id;

    if (
      isEmpty(invoice_no) ||
      isEmpty(issue_date) ||
      isEmpty(due_date) ||
      isEmpty(customer_name) ||
      isEmpty(total_amount) ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res
        .status(400)
        .json({success: false, message: "Missing required fields or items."});
    }

    const newQuotation = await Quotation.create(req.body);

    const savedItems = await Promise.all(
      items.map((item) =>
        QuotationItem.create({
          ...item,
          quotation_id: newQuotation.quotation_id,
        })
      )
    );

    res.status(201).json(
      createSuccess("Quotation created successfully", {
        quotation: newQuotation,
        items: savedItems,
      })
    );
  } catch (error) {
    console.error("Create Quotation Error:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

// 2. Get All Quotations
const getAllQuotations = async (req, res) => {
  const {start} = req.params;
  try {
    const quotations = await Quotation.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Extract all quotation IDs
    const quotationIds = quotations.map((q) => q.quotation_id);

    // Fetch all items that belong to those quotations
    const items = await QuotationItem.findAll({
      where: {
        quotation_id: quotationIds,
      },
      ...(Number.isNaN(Number(start)) || start === undefined
        ? {} // If start is NaN or undefined, no offset/limit
        : {
            offset: start * 15,
            limit: 15,
          }),
    });

    // Group items by quotation_id
    const itemsByQuotation = items.reduce((acc, item) => {
      if (!acc[item.quotation_id]) acc[item.quotation_id] = [];
      acc[item.quotation_id].push(item);
      return acc;
    }, {});

    // Attach items to each quotation
    const quotationsWithItems = quotations.map((quotation) => {
      return {
        ...quotation.toJSON(),
        items: itemsByQuotation[quotation.quotation_id] || [],
      };
    });

    res
      .status(200)
      .json(
        createSuccess("Quotations fetched successfully", quotationsWithItems)
      );
  } catch (error) {
    console.error("Get All Quotations Error:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

// 3. Get Quotation by ID (with items)
const getQuotationById = async (req, res) => {
  try {
    const {id} = req.params;

    const quotation = await Quotation.findByPk(id);
    if (!quotation) {
      return res
        .status(404)
        .json({success: false, message: "Quotation not found"});
    }

    const items = await QuotationItem.findAll({
      where: {quotation_id: id},
    });

    const quotationWithItems = {
      ...quotation.toJSON(),
      items,
    };

    res
      .status(200)
      .json(
        createSuccess("Quotation fetched successfully", quotationWithItems)
      );
  } catch (error) {
    console.error("Get Quotation By ID Error:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

// 4. Update Quotation
const updateQuotation = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const {id} = req.params;

    const quotation = await Quotation.findByPk(id);
    if (!quotation) {
      return res
        .status(404)
        .json({success: false, message: "Quotation not found"});
    }

    await quotation.update(req.body);

    const items = req.body.items;

    if (Array.isArray(items) && items?.length > 0) {
      await QuotationItem.destroy({where: {quotation_id: id}});

      await Promise.all(
        items.map((item) =>
          QuotationItem.create({
            ...item,
            quotation_id: id,
          })
        )
      );
    }

    const updatedItems = await QuotationItem.findAll({
      where: {quotation_id: id},
    });

    res.status(200).json(
      createSuccess("Quotation updated successfully", {
        quotation,
        items: updatedItems,
      })
    );
  } catch (error) {
    console.error("Update Quotation Error:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
};

const GetFilterQuotation = async (req, res) => {};

module.exports = {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
  GetFilterQuotation,
};
