/** @format */

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";
import companyReducer from "../slice/company.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64, // Set this to a higher value (in milliseconds)
      },
    }),
});
