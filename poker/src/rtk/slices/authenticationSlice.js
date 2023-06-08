import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  "authentication/login",
  async ({ username, password }) => {
    const response = await axios.post("http://localhost:4000/login", { username, password });
    console.log(response.data)
    return response.data; // This should return the user data if login was successful
  }
);

export const logout = createAsyncThunk(
  'authentication/logout',
  async () => {
    const response = await axios.post("http://localhost:4000/logout");
    return response.data; // This should return something if logout was successful
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
      });
  },
});

export default authenticationSlice.reducer;