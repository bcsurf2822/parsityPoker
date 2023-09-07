import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'games',
  initialState: {
    data: [],
    isLoading: true,
    error: null,
    joinLoading: false,
    joinError: null,
    currentGame: null
  },
  reducers: {
    requestGames: state => {
      state.isLoading = true;
      state.error = null;
    },
    receiveGames: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    receiveGamesError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    startJoinGame: (state, action) => {
      state.joinLoading = true;
      state.joinError = null;
    },
    joinGameSuccess: (state, action) => {
      state.currentGame = action.payload.game;
      state.joinLoading = false;
    },
    joinGameError: (state, action) => {
      state.joinError = action.payload;
      state.joinLoading = false;
    },
  }
});

export const { 
  requestGames, receiveGames, receiveGamesError, 
} = socketSlice.actions;
export default socketSlice.reducer;
