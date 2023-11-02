import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const updateGameState = (state, action) => {
  const updatedGame = action.payload;
  if (state.currentGame && state.currentGame._id === updatedGame._id) {
    state.currentGame = updatedGame;
  }
};



const currentGameSlice = createSlice({
  name: "game",
  initialState: {
    currentGame: null,
    error: null,
    currentGameLoading: false,
    updateError: null,
  },
  reducers: {
    requestGame: (state, action) => {
      console.log("requestGame called with payload:", action.payload);
    },
    receiveGame: (state, action) => {
      console.log("receiveGame called with payload:", action.payload);
      state.currentGame = action.payload;
    },
    receiveGameError: (state, action) => {
      console.log("receiveGameError called with error:", action.payload);
      state.error = action.payload;
    },
    startJoinGame: (state, action) => {
      console.log("joinGame called with payload:", action.payload);
    },
    joinGameSuccess: (state, action) => {
      console.log("joinGameSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    joinGameError: (state, action) => {
      console.log("joinGameError called with error:", action.payload);
      state.error = action.payload;
    },
    startLeaveGame: (state) => {
      console.log("startLeaveGame called");
    },
    leaveGameSuccess: (state, action) => {
      console.log("leaveGameSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    leaveGameError: (state, action) => {
      console.log("leaveGameError called with error:", action.payload);
      state.error = action.payload;
    },
    startUpdatePositionsAndBlinds: (state, action) => {
      console.log(
        "startUpdatePositionsAndBlinds called with payload:",
        action.payload
      );
      state.currentGameLoading = true;
      console.log("currentGameLoading set to:", state.currentGameLoading);
      state.updateError = null;
    },

    updatePositionsAndBlindsSuccess: (state, action) => {
      console.log(
        "updatePositionsAndBlindsSuccess called with payload:",
        action.payload
      );
      updateGameState(state, action);
      state.currentGameLoading = false;
    },
    updatePositionsAndBlindsError: (state, action) => {
      console.log(
        "updatePositionsAndBlindsError called with error:",
        action.payload
      );
      state.error = action.payload;
      state.currentGameLoading = false;
      state.updateError = action.payload;
    },
    startUpdateCurrentPlayer: (state, action) => {
      console.log(
        "startUpdateCurrentPlayer called with payload:",
        action.payload
      );
      // Any loading or initial state modifications can go here
    },
    updateCurrentPlayerSuccess: (state, action) => {
      console.log(
        "updateCurrentPlayerSuccess called with payload:",
        action.payload
      );
      updateGameState(state, action);
    },
    updateCurrentPlayerError: (state, action) => {
      console.log(
        "updateCurrentPlayerError called with error:",
        action.payload
      );
      state.error = action.payload;
    },

    startEndGame: (state, action) => {
      console.log("startEndGame called with payload:", action.payload);
    },

    endGameSuccess: (state, action) => {
      console.log("endGameSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },

    endGameError: (state, action) => {
      console.log("endGameError called with error:", action.payload);
      state.error = action.payload;
    },

    startDealFlop: (state, action) => {
      console.log("startDealFlop called with payload:", action.payload);
    },
    dealFlopSuccess: (state, action) => {
      console.log("dealFlopSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    dealFlopError: (state, action) => {
      console.log("dealFlopError called with error:", action.payload);
      state.error = action.payload;
    },
    startDealTurn: (state, action) => {
      console.log("startDealTurn called with payload:", action.payload);
    },
    dealTurnSuccess: (state, action) => {
      console.log("dealTurnSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    dealTurnError: (state, action) => {
      console.log("dealTurnError called with error:", action.payload);
      state.error = action.payload;
    },
    startDealRiver: (state, action) => {
      console.log("startDealRiver called with payload:", action.payload);
    },
    dealRiverSuccess: (state, action) => {
      console.log("dealTurnSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    dealRiverError: (state, action) => {
      console.log("dealRiverError called with error:", action.payload);
      state.error = action.payload;
    },

    startPlayerBet: (state, action) => {
      console.log("startPlayerBet called with payload:", action.payload);
    },

    playerBetSuccess: (state, action) => {
      console.log("playerBetSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    playerBetError: (state, action) => {
      console.log("playerBetError called with error:", action.payload);
      state.error = action.payload;
    },

    startPlayerCall: (state, action) => {
      console.log("startPlayerCall called with payload:", action.payload);
    },

    playerCallSuccess: (state, action) => {
      console.log("playerCallSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },

    playerCallError: (state, action) => {
      console.log("playerCallError called with error:", action.payload);
      state.error = action.payload;
    },

    startPlayerCheck: (state, action) => {
      console.log("startPlayerCheck called with payload:", action.payload);
    },

    playerCheckSuccess: (state, action) => {
      console.log("playerCheckSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    playerCheckError: (state, action) => {
      console.log("playerCheckError called with error:", action.payload);
      state.error = action.payload;
    },

    startPlayerFold: (state, action) => {
      console.log("startPlayerFold called with payload:", action.payload);
    },

    playerFoldSuccess: (state, action) => {
      console.log("playerFoldSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },

    playerFoldError: (state, action) => {
      console.log("playerFoldError called with error:", action.payload);
      state.error = action.payload;
    },
    startPotToPlayer: (state, action) => {
      console.log("startPotToPlayer called with payload:", action.payload);
    },
    potToPlayerSuccess: (state, action) => {
      console.log("potToPlayerSuccess called with payload:", action.payload);
      updateGameState(state, action);
    },
    potToPlayerError: (state, action) => {
      console.log("potToPlayerError called with error:", action.payload);
      state.error = action.payload;
    },
    startLoading: (state) => {
      console.log("Starting the loading spinner");
      state.currentGameLoading = true;
    },
    endLoading: (state) => {
      console.log("Stopping the loading spinner");
      state.currentGameLoading = false;
    },
  },
});

export const showLoading = createAsyncThunk(
  'game/showLoading',
  async (_, { dispatch }) => {
    dispatch(currentGameSlice.actions.startLoading());
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    dispatch(currentGameSlice.actions.endLoading());
  }
);

export const {
  requestGame,
  receiveGame,
  receiveGameError,
  startJoinGame,
  joinGameSuccess,
  joinGameError,
  startLeaveGame,
  leaveGameSuccess,
  leaveGameError,
  startUpdatePositionsAndBlinds,
  updatePositionsAndBlindsSuccess,
  updatePositionsAndBlindsError,
  startUpdateCurrentPlayer,
  updateCurrentPlayerSuccess,
  updateCurrentPlayerError,
  startEndGame,
  endGameSuccess,
  endGameError,
  startDealFlop,
  dealFlopSuccess,
  dealFlopError,
  startDealTurn,
  dealTurnSuccess,
  dealTurnError,
  startDealRiver,
  dealRiverSuccess,
  dealRiverError,
  startPlayerBet,
  playerBetSuccess,
  playerBetError,
  startPlayerCall,
  playerCallSuccess,
  playerCallError,
  startPlayerCheck,
  playerCheckSuccess,
  playerCheckError,
  startPlayerFold,
  playerFoldSuccess,
  playerFoldError,
  startPotToPlayer,
  potToPlayerSuccess,
  potToPlayerError,
  startLoading,
  endLoading,
} = currentGameSlice.actions;

export default currentGameSlice.reducer;
