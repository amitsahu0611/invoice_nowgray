/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const createClient = createAsyncThunk(
  "createClient",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await axiosInstance.post(`client/createClient`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getAllClients = createAsyncThunk(
  "getAllClients",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`client/getAllClients`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getClientById = createAsyncThunk(
  "getClientById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`client/getClientById/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const updateClient = createAsyncThunk(
  "updateClient",
  async ({id, data}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `client/updateClient/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

// Create a partner slice
const clientslice = createSlice({
  name: "clientslice",
  initialState: {
    allClients: [],
    singleClient: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.allClients = action.payload.data;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleClient = action.payload.data;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default clientslice.reducer;
