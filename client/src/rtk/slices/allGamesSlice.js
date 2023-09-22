import { createSlice } from "@reduxjs/toolkit";


const allGamesSlice = createSlice({
  name: "games",
  initialState: {
    data: [],
    isLoading: true,
    error: null,
    joinLoading: false,
    leaveLoading: false,
    joinError: null,
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
    startJoinGame: (state) => {
      state.joinLoading = true;
      state.joinError = null;
    },
    joinGameError: (state, action) => {
      state.joinError = action.payload;
      state.joinLoading = false;
    },
    playerJoinedGame: (state, action) => {
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
      state.joinLoading = false;
    },
    startLeaveGame: (state) => {
      state.leaveLoading = true;
      state.leaveError = null;
    },
    leaveGameError: (state, action) => {
      state.leaveError = action.payload;
      state.leaveLoading = false;
    },
    playerLeftGame: (state, action) => {
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
      state.leaveLoading = false;
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
  startLeaveGame,
  leaveGameError,
  playerLeftGame,
} = allGamesSlice.actions;

export default allGamesSlice.reducer;