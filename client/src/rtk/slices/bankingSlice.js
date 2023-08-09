import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const depositSuccess = createAction("banking/depositSuccess");
export const withdrawSuccess = createAction("banking/withdrawSuccess");

export const deposit = createAsyncThunk(
  "banking/deposit",
  async ({ userId, amount }, { dispatch }) => {
    console.log("userId", userId);
    const response = await axios.post("http://localhost:4000/deposit", {
      userId,
      amount,
    });
    console.log(response.data);
    dispatch(depositSuccess(response.data));
    return response.data;
  }
);

export const withdraw = createAsyncThunk(
  "banking/withdraw",
  async ({ userId, amount }, { dispatch }) => {
    const response = await axios.post("http://localhost:4000/withdraw", {
      userId,
      amount,
    });
    console.log(response.data);
    dispatch(withdrawSuccess(response.data));
    return response.data;
  }
);
