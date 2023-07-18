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

export const viewTable = createAsyncThunk(
  "table/view",
  async (gameId) => {
    const response = await axios.get(`http://localhost:4000/games/view/${gameId}`);
    console.log(response.data)
    return response.data;
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: { 
    loading: false,
    error: null,
    table: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewTable.fulfilled, (state, action) => {
        state.loading = false;
        state.table = action.payload;
      })
      .addCase(viewTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to view table';
      });
  },
});

export default tableSlice.reducer;