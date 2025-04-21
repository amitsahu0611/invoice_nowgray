/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const Company = sequelize.define(
  "company",
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
    company_prefix: {
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
    gst: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "#000000",
    },
    bgColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "#FFFFFF",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
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

module.exports = Company;

// const syncDb = async () => {
//   await Company.sync({alter: true});

//   console.log("synced");
// };

// syncDb();
