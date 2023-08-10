import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newDeck = createAsyncThunk(
  "game/initialize",
  async ({ gameId }) => {
    const response = await axios.get(
      `http://localhost:4000/new-deck/${gameId}`
    );
    console.log("DECKresponse", response.data);
    return response.data;
  }
);

export const dealCards = createAsyncThunk(
  'game/dealCards',
  async (gameId, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:4000/deal-cards/${gameId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const endGame = createAsyncThunk(
  'game/endGame',
  async (gameId, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:4000/endgame/${gameId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deckOfCardsSlice = createSlice({
  name: "game",
  initialState: {
    currentGameCards: [],
    pot: 0,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newDeck.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newDeck.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGameCards = action.payload;
      })
      .addCase(newDeck.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(dealCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(dealCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGameCards = action.payload;
      })
      .addCase(dealCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(endGame.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(endGame.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGameCards = null;
      })
      .addCase(endGame.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default deckOfCardsSlice.reducer;
