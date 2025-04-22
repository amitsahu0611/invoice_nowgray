/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Base_URL, getUserData} from "../../../utils/config";
import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";

export const createQuotation = createAsyncThunk(
  "createQuotation",
  async (data, thunkAPI) => {
    const userData = await getUserData();
    console.log("userData", userData);
    data.company_id = userData.company_id;
    data.salesPersonId = userData.user_id;
    console.log("yaha aaya");

    try {
      const response = await axiosInstance.post(
        `quotation/createQuotation`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getAllQuotations = createAsyncThunk(
  "getAllQuotations",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`quotation/getAllQuotations`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getQuotationById = createAsyncThunk(
  "getQuotationById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `quotation/getQuotationById/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const updateQuotation = createAsyncThunk(
  "updateQuotation",
  async ({id, data}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `quotation/updateQuotation/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const approveQuotation = createAsyncThunk(
  "approveQuotation",
  async ({id, data}, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `quotation/approveQuotation/${id}`,
        data
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

const quotationSlice = createSlice({
  name: "quotationSlice",
  initialState: {
    loading: false,
    error: null,
    allQuotations: [],
    singleQuotationData: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllQuotations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuotations = action.payload.result;
      })
      .addCase(getAllQuotations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getQuotationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuotationById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleQuotationData = action.payload.result;
      })
      .addCase(getQuotationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default quotationSlice.reducer;
