import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const startNewGame = createAsyncThunk(
  "deck/startNewGame",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:4000/startNewGame");
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const drawCard = createAsyncThunk(
  "deck/drawCard",
  async ({ deckId }, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/drawCard/${deckId}`);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDeck = createAsyncThunk(
  "deck/getDeck",
  async ({ deckId }, thunkAPI) => {
    try {
      console.log(deckId); // log deckId
      const response = await axios.get(`http://localhost:4000/deck/${deckId}`);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const dealCards = createAsyncThunk(
  "deck/dealCards",
  async ({ deckId }, thunkAPI) => {
    try {
      const deckResponse = await axios.get(`http://localhost:4000/deck/${deckId}`);
      const deck = deckResponse.data.cards;

      let players = [];
      let dealtCardsIndexes = [];

      for (let round = 0; round < 2; round++) {
        for (let player = 0; player < 6; player++) {
          const cardIndex = 6 * round + player;
          if (!players[player]) players[player] = { id: player + 1, cards: [] };
          players[player].cards.push(deck[cardIndex]);
          dealtCardsIndexes.push(cardIndex);
        }
      }

      return { players, dealtCardsIndexes };

    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deckId: null,
    card: null,
    deck: [],
    players: [],
    dealtCardsIndexes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startNewGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startNewGame.fulfilled, (state, action) => {
        state.deckId = action.payload.deckId;
        state.loading = false;
      })
      .addCase(startNewGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      })
      .addCase(getDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeck.fulfilled, (state, action) => {
        state.deck = action.payload.cards; // assuming the response has the entire deck of cards
        state.loading = false;
      })
      .addCase(getDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(dealCards.fulfilled, (state, action) => {
        state.players = action.payload.players; // players with their cards
        state.dealtCardsIndexes = action.payload.dealtCardsIndexes; // store the indexes of dealt cards
        state.loading = false;
      })
  },
});

export default deckSlice.reducer;