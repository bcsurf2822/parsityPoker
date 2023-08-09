import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newDeckAndGame = createAsyncThunk(
  "game/initialize",
  async ({ gameId, playerCount }) => {
    const response = await axios.get(
      `http://localhost:4000/new-deck/${gameId}/${playerCount}`
    );
    return response.data;
  }
);

const deckOfCardsSlice = createSlice({
  name: "game",
  initialState: {
    playersInGame: [],
    currentGameCards: [],
    pot: 0,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newDeckAndGame.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newDeckAndGame.fulfilled, (state, action) => {
        state.status = "idle";
        state.playersInGame = action.payload.playersInGame;
        state.currentGameCards = action.payload.currentGameCards;
      });
  },
});

export default deckOfCardsSlice.reducer;
