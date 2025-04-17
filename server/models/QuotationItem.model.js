/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const QuotationItem = sequelize.define(
  "quotation_item",
  {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    quotation_id: {
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

module.exports = QuotationItem;

// const syncDb = async () => {
//   await QuotationItem.sync({alter: true});

//   console.log("synced");
// };

// syncDb();
