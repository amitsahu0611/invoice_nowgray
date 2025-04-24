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

export const allDownloadLog = createAsyncThunk(
  "allDownloadLog",
  async (start, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `report/getAllDownloadLogs/${start}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getAllMethodLogs = createAsyncThunk(
  "getAllMethodLogs",
  async (start, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `report/getAllMethodLogs/${start}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const reportByCustomer = createAsyncThunk(
  "reportByCustomer",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`report/reportByCustomer`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const createDownloadLog = createAsyncThunk(
  "createDownloadLog",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `report/createDownloadLog`,
        data
      );
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
    reportsByClient: [],
    downloadLogs: [],
    methodLogs: [],
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
      })
      .addCase(allDownloadLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allDownloadLog.fulfilled, (state, action) => {
        state.loading = false;
        state.downloadLogs = action.payload.data;
      })
      .addCase(allDownloadLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllMethodLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMethodLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.methodLogs = action.payload.data;
      })
      .addCase(getAllMethodLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(reportByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reportByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload", action.payload);
        state.reportsByClient = action.payload.data;
      })
      .addCase(reportByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default reportslice.reducer;
