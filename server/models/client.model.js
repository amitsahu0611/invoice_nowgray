/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const Client = sequelize.define(
  "client",
  {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pan_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pan_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_gst: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    client_house_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Client;

// const syncDb = async () => {
//   await Client.sync({alter: true});
//   console.log("Client table synced");
// };

// syncDb();
