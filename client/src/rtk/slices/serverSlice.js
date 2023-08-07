import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchUpdatedUser } from './authenticationSlice';
export const buyInSuccess = createAction('authentication/buyInSuccess');
export const leaveGameSuccess = createAction('authentication/leaveGameSuccess');


export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/games");
      console.log('Fetch Games Called & Response.Data:', response.data);
      return response.data.games;
    } catch (err) {
      console.error('Error in fetchGames:', err);
      return rejectWithValue(err.message ? err.message : 'Unknown error in fetchGames');
    }
  }
);

export const joinGame = createAsyncThunk(
  "games/joinGame",
  async ({ userId, gameId, buyIn, seatId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/join/${gameId}/${seatId}`, { userId, buyIn });
      console.log("Join Called & response:", response)
      dispatch(fetchUpdatedUser(userId));

      return response.data.game;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const playerJoined = createAsyncThunk(
  "games/playerJoined",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const leaveGame = createAsyncThunk(
  "games/leaveGame",
  async ({ gameId, userId },{ dispatch, rejectWithValue }) => { 
    try {
      const response = await axios.post(`http://localhost:4000/leave/${gameId}/${userId}`);
      console.log("leave response:", response.data);
      dispatch(fetchUpdatedUser(userId));

      return response.data.game;
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
    viewedGame: null,
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
        state.joinedGame = action.payload;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to join game';
      })
      .addCase(playerJoined.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(leaveGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveGame.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
        state.joinedGame = null;
      })
      .addCase(leaveGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to leave game';
      });
  },
});

export default serverSlice.reducer;