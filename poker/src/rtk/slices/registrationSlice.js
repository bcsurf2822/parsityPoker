import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "registration/register",
  async ({ email, username, password }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        email,
        password,
      });
      console.log("Register Response", response)
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isRegistered: false,
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
      state.isRegistered = true;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error);
    })
  }
});

export default registrationSlice.reducer;
