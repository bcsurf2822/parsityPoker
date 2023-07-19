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
      .addCase(viewTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewTable.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedGame = action.payload;
      })
      .addCase(viewTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to view table';
      });
  },
});

export default serverSlice.reducer;
