import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/games");
      console.log('Server response:', response.data);
      return response.data.games;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const viewTable = createAsyncThunk(
  "games/viewTable",
  async (gameId) => {
    const response = await axios.get(`http://localhost:4000/games/view/${gameId}`);
    console.log(response.data)
    return response.data;
  }
);

export const joinGame = createAsyncThunk(
  "games/joinGame",
  async ({ userId, gameId, buyIn, seatId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/join/${gameId}/${seatId}`, { userId, buyIn });
      console.log("join response:", response)
      return response.data.game;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const leaveGame = createAsyncThunk(
  "games/leaveGame",
  async ({ gameId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/leave/${gameId}/${userId}`);
      console.log("leave response:", response);
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
    joinedGame: null,
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
      .addCase(viewTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewTable.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedGame = action.payload;
        state.currentTableName = action.payload.name;
      })
      .addCase(viewTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to view table';
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