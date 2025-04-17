/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");
const QuotationItem = require("./QuotationItem.model");
const Company = require("./Company.model");

const Quotation = sequelize.define(
  "quotation",
  {
    quotation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    salesPersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoice_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_gst: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pannumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pancode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tax_percent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gstcalculated: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    houseNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roadStreet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discountType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discountValue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    termsAndConditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    selectBox: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "pending",
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ApproverCompanyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ApproverCompanyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approverName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Quotation;

// const syncDb = async () => {
//   await Quotation.sync({alter: true});

//   console.log("synced");
// };

// syncDb();
