/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const Payment = sequelize.define(
  "payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Payment;

// (async () => {
//   await Payment.sync({alter: true});
//   console.log("Payment table synced.");
// })();
