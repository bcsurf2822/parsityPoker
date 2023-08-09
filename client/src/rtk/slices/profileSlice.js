import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUsername = createAsyncThunk(
  "profile/updateUsername",
  async ({ token, username }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:4000/username`,
        { username },
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unexpected error"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    updating: false,
    error: null,
    username: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUsername.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.updating = false;
        state.username = action.payload.username;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
