import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const depositSuccess = createAction('banking/depositSuccess');
export const withdrawSuccess = createAction('banking/withdrawSuccess');

export const deposit = createAsyncThunk(
  "banking/deposit",
  async ({ userId, amount }, { dispatch }) => {
    console.log('userId', userId);
    const response = await axios.post("http://localhost:4000/deposit", { userId, amount });
    console.log(response.data);
    dispatch(depositSuccess(response.data));
    return response.data;
  }
);

export const withdraw = createAsyncThunk(
  "banking/withdraw",
  async ({ userId, amount }, { dispatch }) => {
    const response = await axios.post("http://localhost:4000/withdraw", { userId, amount });
    console.log(response.data);
    dispatch(withdrawSuccess(response.data));
    return response.data;
  }
);



const bankingSlice = createSlice({
  name: 'banking',
  initialState: { 
    accountBalance: 0,
    bankBalance: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deposit.pending, (state) => {
        state.loading = true;
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.loading = false;
        state.accountBalance = action.payload.accountBalance;
        state.bankBalance = action.payload.bankBalance;

        depositSuccess(action.payload);
      })
      .addCase(deposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Deposit failed';
      })
      .addCase(withdraw.pending, (state) => {
        state.loading = true;
      })
      .addCase(withdraw.fulfilled, (state, action) => {
        state.loading = false;
        state.bankBalance = action.payload.bankBalance;
        state.accountBalance = action.payload.accountBalance;

        withdrawSuccess(action.payload);
      })
      .addCase(withdraw.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Withdrawal failed';
      });
  },
});

export default bankingSlice.reducer;