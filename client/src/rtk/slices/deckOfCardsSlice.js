import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchNewDeck = createAsyncThunk('deck/fetchNew', async (gameId) => {
  const response = await axios.get(`http://localhost:4000/new-deck/${gameId}`);
  return response.data;
});

export const fetchedDeck = createAsyncThunk(
  "deck/newDeck",
  async(updatedGame) => {
    return updatedGame;
  }
);

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    currentDeck: [],
    loading: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewDeck.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchNewDeck.fulfilled, (state, action) => {
        state.currentDeck = action.payload.currentDeck;
        state.loading = 'idle';
      })
      .addCase(fetchNewDeck.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default deckSlice.reducer