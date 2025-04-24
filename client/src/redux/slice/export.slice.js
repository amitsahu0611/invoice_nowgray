/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const exportQuotation = createAsyncThunk(
  "exportQuotation",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await axiosInstance.post(
        `quotation/exportQuotation`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
);

const exportSlice = createSlice({
  name: "exportSlice",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {},
});

// Export the reducer and actions
export default exportSlice.reducer;
