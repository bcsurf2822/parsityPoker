import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { depositSuccess, withdrawSuccess } from "../actions/depositWithdraw";
import { buyInSuccess, leaveGameSuccess } from "./serverSlice";

export const login = createAsyncThunk(
  "authentication/login",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:4000/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  }
);

export const logout = createAsyncThunk("authentication/logout", async () => {
  const response = await axios.post("http://localhost:4000/logout");
  localStorage.removeItem("token");

  return response.data;
});

export const initializeAuth = createAsyncThunk(
  "authentication/initializeAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (token) {
      let user = jwt_decode(token);

      const response = await axios.get("http://localhost:4000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("USER API RES", response);

      if (response.data) {
        user = response.data;
      }

      return { user, token };
    }

    return null;
  }
);


const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: false,
    loading: false,
    initializing: true,
    error: null,
    user: null,
  },
  reducers: {},
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
      .addCase(buyInSuccess, (state, action) => {
        if (state.user && state.user.userId === action.payload.userId) {
          state.user.accountBalance -= action.payload.buyIn
        }
    })
    .addCase(leaveGameSuccess, (state, action) => {
        if (state.user && state.user.userId === action.payload.userId) {
          state.user.accountBalance += action.payload.playersInGame[0].chips;
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
