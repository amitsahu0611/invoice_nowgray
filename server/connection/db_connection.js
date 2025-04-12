const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config({
  path: "./.env",
});

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST_NAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log(colors.rainbow("SQL Server Connected!!"));
  } catch (error) {
    console.error(colors.red("Unable to connect to the database:", error));
  }
};

process.on("SIGINT", async () => {
  try {
    await db.close();
    console.log("Connection closed gracefully.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing the database connection:", error);
    process.exit(1);
  }
});

module.exports = db;
module.exports.dbConnection = dbConnection;
