import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateUser } from './authenticationSlice';

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
      return rejectWithValue(err.response.data);
    }
  }
);

export const viewTable = createAsyncThunk(
  "games/viewTable",
  async (gameId) => {
    const response = await axios.get(`http://localhost:4000/games/view/${gameId}`);
    console.log("view table called and Data",response.data)
    return response.data;
  }
);

export const joinGame = createAsyncThunk(
  "games/joinGame",
  async ({ userId, gameId, buyIn, seatId }, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/join/${gameId}/${seatId}`, { userId, buyIn });
      console.log("Join Called & response:", response)
      
      const updatedUser = response.data.user; // Assuming your API returns the updated user in the response
      dispatch(updateUser(updatedUser)); // Dispatch action to update user in your Redux store

      // Update user's account balance in the client side
      const { user } = getState().authentication; // Get current user from Redux store
      if (user) {
        user.accountBalance -= buyIn; // Subtract the buyIn from the user's account balance
        dispatch(updateUser(user)); // Dispatch action to update user in your Redux store
      }

      return response.data.game;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const leaveGame = createAsyncThunk(
  "games/leaveGame",
  async ({ gameId, userId, amountWon },{ dispatch, rejectWithValue }) => { // Assuming amountWon is provided
    try {
      const response = await axios.post(`http://localhost:4000/leave/${gameId}/${userId}`);
      console.log("leave response:", response);
      
      const updatedUser = response.data.user; // Assuming your API returns the updated user in the response
      dispatch(updateUser(updatedUser)); // Dispatch action to update user in your Redux store

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