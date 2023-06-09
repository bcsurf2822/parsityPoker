import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const joinTable = createAsyncThunk(
  "table/join",
  async ({userId}) => {
    const response = await axios.post("http://localhost:4000/api/table/join", { userId })
    console.log(response.data)
    return response.data;
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: { 
    isJoined: false,
    loading: false,
    error: null,
    table: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinTable.fulfilled, (state, action) => {
        state.isJoined = true;
        state.loading = false;
        state.table = action.payload
      })
      .addCase(joinTable.rejected, (state, action) => {
        state.isJoined = false;
        state.loading = false;
        state.error = action.error.message || 'Failed to join table';
      });
  },
});

export default tableSlice.reducer;