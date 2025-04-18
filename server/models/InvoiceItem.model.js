/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const InvoiceItems = sequelize.define(
  "invoice_item",
  {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monthly_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = InvoiceItems;

// const syncDb = async () => {
//   await InvoiceItems.sync({alter: true});

//   console.log("synced");
// };

// syncDb();
