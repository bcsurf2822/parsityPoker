import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUsername = createAsyncThunk(
  'profile/updateUsername',
  async ({ token, username }, thunkAPI) => {   
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Set the JWT token here
        }
      };

      const response = await axios.put(`http://localhost:4000/username`, { username }, config);
      return response.data;
    } catch (error) {
      // Return the error message from the server, or a default message if there is no server message
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unexpected error');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    updating: false,
    error: null,
    username: null, // Add this to your state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUsername.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.updating = false;
        state.username = action.payload.username; // Update the username when the request is successful
        state.error = null;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message; // Update the error state when the request fails
      });
  },
});

export default profileSlice.reducer;
