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
      console.log("startJoinGame called with payload:", action.payload);
      state.joinLoading = true;
      state.joinError = null;
  },
  joinGameSuccess: (state, action) => {
    console.log("joinGameSuccess called with payload:", action.payload);
    const updatedGame = action.payload.game;
    state.data = state.data.map(game => 
      game._id === updatedGame._id ? updatedGame : game
    );
    state.currentGame = updatedGame;
    state.joinLoading = false;
  },
  
  joinGameError: (state, action) => {
      console.log("joinGameError called with error:", action.payload);
      state.joinError = action.payload;
      state.joinLoading = false;
  },
  playerJoined: (state, action) => {
    console.log("playerJoined called with payload:", action.payload);
    const { gameId, player, seatId } = action.payload;
    const gameToUpdate = state.data.find(game => game._id === gameId);
    if (gameToUpdate) {
      const seatToUpdate = gameToUpdate.seats.find(seat => seat._id.toString() === seatId);
      if (seatToUpdate) {
        seatToUpdate.player = player;
      }
    }
  },

  
  }
});

export const { 
  requestGames, receiveGames, receiveGamesError, 
  startJoinGame, joinGameSuccess, joinGameError, playerJoined
} = socketSlice.actions;

export default socketSlice.reducer;
