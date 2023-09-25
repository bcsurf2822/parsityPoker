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
    playerUpdate: (state, action) => {
      const updatedGame = action.payload;
      state.data = state.data.map((game) =>
        game._id === updatedGame._id ? updatedGame : game
      );
    },
  },
});

export const { requestGames, receiveGames, receiveGamesError, playerUpdate } =
  allGamesSlice.actions;

export default allGamesSlice.reducer;
