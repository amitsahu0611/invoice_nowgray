/** @format */

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";
import companyReducer from "../slice/company.slice";
import quotationReducer from "../slice/quotation.slice";
import invoiceReducer from "../slice/invoice.slice";
import paymentReducer from "../slice/payment.slice";
import reportReducer from "../slice/reports.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    quotation: quotationReducer,
    invoice: invoiceReducer,
    payment: paymentReducer,
    report: reportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64, // Set this to a higher value (in milliseconds)
      },
    }),
});
