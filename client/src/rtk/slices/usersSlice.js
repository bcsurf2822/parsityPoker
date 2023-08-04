import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsernameById = createAsyncThunk(
  'user/fetchUsernameById',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/${userId}/username`);
      console.log("fetchusernameResponse", response.data)
      return response.data.username;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsernameById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsernameById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload;
      })
      .addCase(fetchUsernameById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default userSlice.reducer;
