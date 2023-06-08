import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const drawCard = createAsyncThunk(
  "deck/drawCard",
  async ({deckId}, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/drawCard/${deckId}`);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deckSlice = createSlice({
  name: "deck",
  initialState: {
    card: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(drawCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(drawCard.fulfilled, (state, action) => {
        state.card = action.payload;
        state.loading = false;
      })
      .addCase(drawCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error);
      });
  },
});

export default deckSlice.reducer;