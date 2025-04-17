/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Base_URL} from "../../../utils/config";
import axios from "axios";

export const createQuotation = createAsyncThunk(
  "createQuotation",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await axios.post(
        `${Base_URL}quotation/createQuotation`,
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
      const response = await axios.get(`${Base_URL}quotation/getAllQuotations`);
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
      const response = await axios.get(
        `${Base_URL}quotation/getQuotationById/${id}`
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
      const response = await axios.put(
        `${Base_URL}quotation/updateQuotation/${id}`,
        data
      );
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
