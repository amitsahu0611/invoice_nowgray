/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const getAllInvoices = createAsyncThunk(
  "getAllInvoices",
  async (start, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`invoices/allInvoices/${start}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getInvoiceById = createAsyncThunk(
  "getInvoiceById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`invoices/getInvoiceById/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "updateInvoice",
  async ({id, data}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `invoices/updateInvoice/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

// Create a partner slice
const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState: {
    allInvoices: [],
    singleInvoice: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.allInvoices = action.payload.data;
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleInvoice = action.payload;
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default invoiceSlice.reducer;
