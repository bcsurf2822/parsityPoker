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
    },
    playerJoin: (state, action) => {
      
      const { gameId, seatId, player } = action.payload;
      const game = state.data.find(game => game._id === gameId);
      if (game) {
        const seat = game.seats.find(seat => seat._id === seatId);
        if (seat) {
          seat.player = player;
        }
      }
    }
  }
});

export const { 
  requestGames, receiveGames, receiveGamesError, 
  requestJoinGame, gameJoined, joinGameError, playerJoin
} = socketSlice.actions;
export default socketSlice.reducer;
