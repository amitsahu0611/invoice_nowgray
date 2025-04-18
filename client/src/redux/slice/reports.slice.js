/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const getPaymentReport = createAsyncThunk(
  "getPaymentReport",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`report/paymentReport`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

const reportslice = createSlice({
  name: "reportslice",
  initialState: {
    loading: false,
    error: null,
    paymentReport: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPaymentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentReport = action.payload.result;
      })
      .addCase(getPaymentReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default reportslice.reducer;
