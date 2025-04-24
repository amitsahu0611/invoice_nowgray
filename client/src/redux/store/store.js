/** @format */

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";
import companyReducer from "../slice/company.slice";
import quotationReducer from "../slice/quotation.slice";
import invoiceReducer from "../slice/invoice.slice";
import paymentReducer from "../slice/payment.slice";
import reportReducer from "../slice/reports.slice";
import clientReducer from "../slice/client.slice";
import exportReducer from "../slice/export.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    quotation: quotationReducer,
    invoice: invoiceReducer,
    payment: paymentReducer,
    report: reportReducer,
    client: clientReducer,
    export: exportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64, // Set this to a higher value (in milliseconds)
      },
    }),
});
