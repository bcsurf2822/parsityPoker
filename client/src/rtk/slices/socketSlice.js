import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "games",
  initialState: {
    data: [],
    isLoading: true,
    error: null,
    joinLoading: false,
    leaveLoading: false,
    joinError: null,
    currentGame: null,
  },
  reducers: {
    requestGames: (state) => {
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

    joinGameError: (state, action) => {
      console.log("joinGameError called with error:", action.payload);
      state.joinError = action.payload;
      state.joinLoading = false;
    },
    playerJoinedGame: (state, action) => {
      console.log("joinGameUpdated called with payload:", action.payload);
      const updatedGame = action.payload;

      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );

      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }

      state.joinLoading = false;
    },

    startLeaveGame: (state, action) => {
      console.log("startLeaveGame called with payload:", action.payload);
      state.leaveLoading = true;
      state.error = null;
    },
    playerLeftGame: (state, action) => {
      console.log("playerLeftGame called with payload:", action.payload);
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = null;
      }
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
      // Optionally, you can set some kind of loading state if you want to show a loading spinner or something similar
      // state.updateLoading = true;
      // state.updateError = null;
    },

    updatePositionsAndBlindsSuccess: (state, action) => {
      console.log(
        "updatePositionsAndBlindsSuccess called with payload:",
        action.payload
      );
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }
      // Optionally, you can reset the loading state if you added one
      // state.updateLoading = false;
    },

    updatePositionsAndBlindsError: (state, action) => {
      console.log(
        "updatePositionsAndBlindsError called with error:",
        action.payload
      );
      state.error = action.payload;
      // Optionally, reset the loading state if you added one
      // state.updateLoading = false;
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
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }
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
      // Any loading or initial state modifications can go here
    },

    endGameSuccess: (state, action) => {
      console.log("endGameSuccess called with payload:", action.payload);
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }
    },

    endGameError: (state, action) => {
      console.log("endGameError called with error:", action.payload);
      state.error = action.payload;
    },
    startDealCards: (state, action) => {
      console.log("startDealCards called with payload:", action.payload);
    },
    dealCardsSuccess: (state, action) => {
      console.log("cardsDealtSuccess called with payload:", action.payload);
      const updatedGame = action.payload;

      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );

      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }
    },
    dealCardsError: (state, action) => {
      console.log("dealCardsError called with error:", action.payload);
      state.error = action.payload;
    },
    startDealFlop: (state, action) => {
      console.log("startDealFlop called with payload:", action.payload);
    },
    dealFlopSuccess: (state, action) => {
      console.log("dealFlopSuccess called with payload:", action.payload);
      const updatedGame = action.payload;

      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );

      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }
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
      const updatedGame = action.payload;

      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );

      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }

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
      const updatedGame = action.payload;

      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );

      if (state.currentGame && state.currentGame._id === updatedGame._id) {
        state.currentGame = updatedGame;
      }
    },
  },
});

export const {
  requestGames,
  receiveGames,
  receiveGamesError,
  startJoinGame,
  joinGameError,
  playerJoinedGame,
  leaveGameError,
  playerLeftGame,
  startLeaveGame,
  updatePositionsAndBlindsError,
  updatePositionsAndBlindsSuccess,
  startUpdatePositionsAndBlinds,
  startUpdateCurrentPlayer,
  updateCurrentPlayerSuccess,
  updateCurrentPlayerError,
  startEndGame,
  endGameSuccess,
  endGameError,
  startDealCards,
  dealCardsSuccess,
  dealCardsError,
  startDealFlop,
  dealFlopSuccess,
  dealFlopError,
  startDealTurn,
  dealTurnSuccess,
  dealTurnError,
  startDealRiver,
  dealRiverSuccess,
} = socketSlice.actions;

export default socketSlice.reducer;
