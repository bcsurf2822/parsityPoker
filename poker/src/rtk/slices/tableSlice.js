import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const joinTable = createAsyncThunk(
  "table/join",
  async ({userId, gameId, chips}) => {
    const response = await axios.post(`http://localhost:4000/games/join/${gameId}`, { userId, chips });
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
    gameId: null,  // Add this field to store the gameId
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
        state.gameId = action.meta.arg.gameId;  // Store the gameId in the state
      })
      .addCase(joinTable.rejected, (state, action) => {
        state.isJoined = false;
        state.loading = false;
        state.error = action.error.message || 'Failed to join table';
      });
  },
});

export default tableSlice.reducer;