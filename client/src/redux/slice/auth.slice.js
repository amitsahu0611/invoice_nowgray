/** @format */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Fetch bank data
// export const login = createAsyncThunk("login", async (data, thunkAPI) => {
//   try {
//     const response = await axios.post(`${Base_URL}login`, data);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue({error: error.message});
//   }
// });

// export const forgotPassword = createAsyncThunk(
//   "forgotPassword",
//   async (data, thunkAPI) => {
//     console.log("data", data);
//     try {
//       const response = await axios.post(`${Base_URL}forgotPassword`, data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({error: error.message});
//     }
//   }
// );

// Create a partner slice
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    // authData: [],
    // forgotPassword: {},
    // loading: false,
    // error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder;
    // .addCase(login.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(login.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.authData = action.payload;
    // })
    // .addCase(login.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // .addCase(forgotPassword.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(forgotPassword.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.forgotPassword = action.payload;
    // })
    // .addCase(forgotPassword.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

// Export the reducer and actions
export default authSlice.reducer;
