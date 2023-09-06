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
    requestJoinGame: state => {
      state.joinLoading = true;
      state.joinError = null;
    },
    gameJoined: (state, action) => {
      state.currentGame = action.payload;
      state.joinLoading = false;
    },
    joinGameError: (state, action) => {
      state.joinError = action.payload;
      state.joinLoading = false;
    }
  }
});

export const { 
  requestGames, receiveGames, receiveGamesError, 
  requestJoinGame, gameJoined, joinGameError 
} = socketSlice.actions;
export default socketSlice.reducer;
