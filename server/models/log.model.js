/** @format */

const {DataTypes} = require("sequelize");
const sequelize = require("../connection/db_connection");

const Log = sequelize.define("log", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestData: {
    type: DataTypes.TEXT("long"), // store full JSON
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Log;

// (async () => {
//   await Log.sync({alter: true});
//   console.log("Payment table synced.");
// })();
