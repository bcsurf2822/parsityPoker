import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'games',
  initialState: {
    data: [],
    isLoading: true,
    error: null,
    joinLoading: false,
    leaveLoading: false, 
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
  startLeaveGame: (state, action) => {
    console.log("startLeaveGame called with payload:", action.payload);
    state.leaveLoading = true;
    state.error = null;  
  },
  playerLeftGame: (state, action) => {
    console.log("playerLeftGame called with payload:", action.payload);
    const updatedGame = action.payload;
    state.data = state.data.map(game => 
      game._id === updatedGame._id ? updatedGame : game
    );
    // If the current game is the one being left, set it to null
    if(state.currentGame && state.currentGame._id === updatedGame._id) {
      state.currentGame = null;
    }
  },
  leaveGameError: (state, action) => {
    console.log("leaveGameError called with error:", action.payload);
    state.error = action.payload;
  },
  startUpdatePositionsAndBlinds: (state, action) => {
    console.log("startUpdatePositionsAndBlinds called with payload:", action.payload);
    // Optionally, you can set some kind of loading state if you want to show a loading spinner or something similar
    // state.updateLoading = true;
    // state.updateError = null;
  },
  
  updatePositionsAndBlindsSuccess: (state, action) => {
    console.log("updatePositionsAndBlindsSuccess called with payload:", action.payload);
    const updatedGame = action.payload;
    state.data = state.data.map(game => 
      game._id === updatedGame._id ? updatedGame : game
    );
    // Update the current game if it's the one being updated
    if(state.currentGame && state.currentGame._id === updatedGame._id) {
      state.currentGame = updatedGame;
    }
    // Optionally, you can reset the loading state if you added one
    // state.updateLoading = false;
  },
  
  updatePositionsAndBlindsError: (state, action) => {
    console.log("updatePositionsAndBlindsError called with error:", action.payload);
    state.error = action.payload;
    // Optionally, reset the loading state if you added one
    // state.updateLoading = false;
  },
}
});

export const { 
  requestGames, receiveGames, receiveGamesError, 
  startJoinGame, joinGameSuccess, joinGameError, playerJoined, leaveGameError, playerLeftGame, startLeaveGame, updatePositionsAndBlindsError, updatePositionsAndBlindsSuccess, startUpdatePositionsAndBlinds
} = socketSlice.actions;

export default socketSlice.reducer;
