/** @format */

const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const {dbConnection} = require("./connection/db_connection");
const db = require("./connection/db_connection");
const cron = require("node-cron");
const {Op, Sequelize} = require("sequelize");
const moment = require("moment");
const userRouter = require("./routes/users.route");
const lookupRouter = require("./routes/lookup.route");
const productRouter = require("./routes/product.route");
const customerRouter = require("./routes/customer.route");
const invoiceRouter = require("./routes/invoice.route");
const paymentRouter = require("./routes/payment.router");
const MenuMastersRoutes = require("./routes/menu_master.route");
const smtpConfRoutes = require("./routes/smtpConf.router");
const {sendRecurringInvoice} = require("./controllers/sendRecurringInvoice");
const {sendRecurringInvoiceNext} = require("./controllers/invoice.controller");
const {Invoice} = require("./models/invoice.model");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8001;

app.use(
  cors({
    // origin: "https://invoice.loms-law.com",
    // origin: "https://invoice.myycrowsoft.com",
    origin: "*",
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", express.static("public"));
app.use("/docimages", express.static("public/docimages"));
app.use("/docimage", express.static(path.join(__dirname, "public/uploads")));

app.use(express.json());
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));

app.use("/api/user", userRouter);
app.use("/api/lookup", lookupRouter);
app.use("/api/product", productRouter);
app.use("/api/customer", customerRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/menu", MenuMastersRoutes);
app.use("/api/smtp", smtpConfRoutes);

app.listen(PORT, () => {
  dbConnection();

  console.log(colors.rainbow(`Server running on PORT ${PORT}...`));
});
