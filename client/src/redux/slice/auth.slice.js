/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`user/login`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({error: error.message});
  }
});

export const createUser = createAsyncThunk(
  "createUser",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await axiosInstance.post(`user/createUser`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const getAllUsers = createAsyncThunk("getAllUsers", async (thunkAPI) => {
  try {
    const response = await axiosInstance.get(`user/getAllStaffs`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({error: error.message});
  }
});

export const getUserById = createAsyncThunk(
  "getUserById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`user/getUserById/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({id, data}, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`user/updateUsers/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

// Create a partner slice
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    allStaffs: [],
    singleStaff: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allStaffs = action.payload.result;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleStaff = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export default authSlice.reducer;
