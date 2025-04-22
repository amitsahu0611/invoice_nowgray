/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const DownloadLog = sequelize.define(
  "DownloadLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("invoice", "quotation"),
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    downloadedBy: {
      type: DataTypes.INTEGER, // or DataTypes.INTEGER if referencing User ID
      allowNull: false,
    },
    downloaderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    downloaderRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    downloadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DownloadLog;

// const syncDb = async () => {
//   await DownloadLog.sync({alter: true});
//   console.log("synced");
// };

// syncDb();
