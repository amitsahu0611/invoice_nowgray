/** @format */

const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const {dbConnection} = require("./connection/db_connection");
const userRouter = require("./routes/users.route");
const companyRouter = require("./routes/company.route");
const quotationRouter = require("./routes/quotation.route");
const invoiceRouter = require("./routes/invoice.route");
const paymentRouter = require("./routes/payment.route");
const reportRouter = require("./routes/report.route");
const clientRouter = require("./routes/client.route");

const logMiddleware = require("./utils/log");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8001;

app.use(
  cors({
    origin: "*",
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(logMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/quotation", quotationRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/report", reportRouter);
app.use("/api/client", clientRouter);

app.listen(PORT, () => {
  dbConnection();
  console.log(colors.rainbow(`Server running on PORT ${PORT}...`));
});
