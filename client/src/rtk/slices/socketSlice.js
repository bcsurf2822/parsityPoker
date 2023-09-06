import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'games',
  initialState: {
    data: [],
    isLoading: true,
    error: null
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
    }
  }
});

export const { requestGames, receiveGames, receiveGamesError } = socketSlice.actions;
export default socketSlice.reducer;
