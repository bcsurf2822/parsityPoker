import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newDeck = createAsyncThunk(
  "game/initialize",
  async ({ gameId }) => {
    const response = await axios.get(
      `http://localhost:4000/new-deck/${gameId}`
    );
    console.log("NEW DECK ::", response.data);
    return response.data;
  }
);

export const dealCards = createAsyncThunk(
  'game/dealCards',
  async (gameId, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:4000/deal-cards/${gameId}`);
      console.log("DEAL CARDS----", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const endGame = createAsyncThunk(
  'game/endGame',
  async (gameId, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:4000/endgame/${gameId}`);
      console.log("END GAME-----", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

