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

export const playerLeft = createAsyncThunk(
  "games/playerJoined",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const updatePositionsAndBlinds = createAsyncThunk(
  "games/updatePositionsAndBlinds",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/${gameId}/updatePostionsAndBlinds`);
      console.log("Update positions and blinds response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const gameUpdated = createAsyncThunk(
  "games/gameUpdated",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const fetchNewDeck = createAsyncThunk(
  'deck/fetchNewDeck',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/new-deck/${gameId}`);
      return response.data;
    } catch (err) {
      console.error('Error in fetchNewDeck:', err);
      return rejectWithValue(err.message ? err.message : 'Unknown error in fetchNewDeck');
    }
  }
);


const serverSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    currentGame: null,
    currentDeck: null, 
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

        const leftGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (leftGameIndex > -1) {
          state.games[leftGameIndex] = action.payload;
        }
      })
      .addCase(leaveGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to leave game';
      })
      .addCase(updatePositionsAndBlinds.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePositionsAndBlinds.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(updatePositionsAndBlinds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update positions and blinds';
      })
      .addCase(fetchNewDeck.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewDeck.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDeck = action.payload;
      })
      .addCase(fetchNewDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch new deck';
      })
      .addCase(gameUpdated.fulfilled, (state, action) => {
        state.currentGame = action.payload;
      })
  },
});

export default serverSlice.reducer;