import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/games");
      return response.data.games;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const joinGame = createAsyncThunk(
  "games/joinGame",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/games/join/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const serverSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    currentGame: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch games';
      })
      .addCase(joinGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload.game;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to join game';
      });
  },
});

export default serverSlice.reducer;
