/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Base_URL} from "../../../utils/config";
import axios from "axios";

export const createCompany = createAsyncThunk(
  "createCompany",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await axios.post(
        `${Base_URL}company/createCompany`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getAllCompany = createAsyncThunk(
  "getAllCompany",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${Base_URL}company/getAllCompanies`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

const companySlice = createSlice({
  name: "companySlice",
  initialState: {
    loading: false,
    error: null,
    allCompanies: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.allCompanies = action.payload;
      })
      .addCase(getAllCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default companySlice.reducer;
