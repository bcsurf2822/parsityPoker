import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { depositSuccess, withdrawSuccess } from './bankingSlice';



export const login = createAsyncThunk(
  "authentication/login",
  async ({ username, password }) => {
    const response = await axios.post("http://localhost:4000/login", { username, password });

    // save JWT to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  }
);

export const logout = createAsyncThunk(
  'authentication/logout',
  async () => {
    const response = await axios.post("http://localhost:4000/logout");
    // clear JWT from localStorage
    localStorage.removeItem('token');

    return response.data;
  }
);

export const initializeAuth = createAsyncThunk(
  'authentication/initializeAuth',
  async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      console.log("TOKEN", token)
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
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.error.message || 'Login failed';
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
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
  },
});

export default authenticationSlice.reducer;