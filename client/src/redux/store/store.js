/** @format */

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64, // Set this to a higher value (in milliseconds)
      },
    }),
});
