/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const CompanyInfos = sequelize.define(
  "companyInfos",
  {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CompanyInfos;

// const syncDb = async () => {
//   await CompanyInfos.sync({alter: true});

//   console.log("synced");
// };

// syncDb();
