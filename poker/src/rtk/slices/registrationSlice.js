import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "registration/register",
  async ({ email, username, password }) => {
    const response = await axios.post("http://localhost:4000/register", {
      username,
      email,
      password,
    });
    return response.data;
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers : (builder) =>  {
    builder
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase (register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }
});

export default registrationSlice.reducer;
