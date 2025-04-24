/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Base_URL, getUserData} from "../../../utils/config";
import axiosInstance from "../../../utils/axiosInstance";

export const createPayment = createAsyncThunk(
  "createPayment",
  async (data, thunkAPI) => {
    const userData = await getUserData();
    data.createdBy = userData.user_id;
    try {
      const response = await axiosInstance.post(`payment/createPayment`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getAllPayment = createAsyncThunk(
  "getAllPayment",
  async (start, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `payment/getAllPayment/${start}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getMonthlyPaymentSummary = createAsyncThunk(
  "getMonthlyPaymentSummary",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `payment/getMonthlyPaymentSummary`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getPaymentById = createAsyncThunk(
  "getPaymentById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`payment/getPaymentById/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const updatePayment = createAsyncThunk(
  "updatePayment",
  async ({data, id}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `payment/updatePayment/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

// /approve/:payment_id/:approvedBy

export const approvePayment = createAsyncThunk(
  "approvePayment",
  async ({payment_id, approvedBy}, thunkAPI) => {
    // return;
    console.log("payment_id", payment_id, approvedBy);
    try {
      const response = await axiosInstance.put(
        `payment/approve/${payment_id}/${approvedBy}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    allPayments: [],
    singlePayment: {},
    loading: false,
    error: null,
    dashboardData: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.allPayments = action.payload.result;
      })
      .addCase(getAllPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload", action.payload);
        state.singlePayment = action.payload.result;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMonthlyPaymentSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthlyPaymentSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getMonthlyPaymentSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default authSlice.reducer;
