import { createSlice } from "@reduxjs/toolkit";
import { depositSuccess, withdrawSuccess } from "../actions/depositWithdraw";
import { login, logout, initializeAuth } from "../actions/auth";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    loading: false,
    initializing: true,
    error: null,
    user: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null; // clear user data on logout
      })
      .addCase(depositSuccess, (state, action) => {
        if (state.user && state.user.userId === action.payload.userId) {
          state.user.accountBalance = action.payload.accountBalance;
          state.user.bankBalance = action.payload.bankBalance;
        }
      })
      .addCase(withdrawSuccess, (state, action) => {
        if (state.user && state.user.userId === action.payload.userId) {
          state.user.accountBalance = action.payload.accountBalance;
          state.user.bankBalance = action.payload.bankBalance;
        }
      })
      .addCase(initializeAuth.pending, (state) => {
        state.initializing = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.initializing = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.initializing = false;
      });
  },
});

export default authenticationSlice.reducer;
