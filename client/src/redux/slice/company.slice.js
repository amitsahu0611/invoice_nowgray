/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const createCompany = createAsyncThunk(
  "createCompany",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await axiosInstance.post(`company/createCompany`, data);
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
      const response = await axiosInstance.get(`company/getAllCompanies`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getCompanyById = createAsyncThunk(
  "getCompanyById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`company/getCompanyById/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const updateCompany = createAsyncThunk(
  "updateCompany",
  async ({id, data}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `company/updateCompany/${id}`,
        data
      );
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
    singleCompanyData: {},
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
      })
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCompanyData = action.payload;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default companySlice.reducer;
