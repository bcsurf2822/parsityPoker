import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

import { fetchUpdatedUser } from "../actions/auth";
export const buyInSuccess = createAction("authentication/buyInSuccess");
export const leaveGameSuccess = createAction("authentication/leaveGameSuccess");

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/games");
      console.log("Fetch Games Called & Response.Data:", response.data);
      return response.data.games;
    } catch (err) {
      console.error("Error in fetchGames:", err);
      return rejectWithValue(
        err.message ? err.message : "Unknown error in fetchGames"
      );
    }
  }
);

export const joinGame = createAsyncThunk(
  "games/joinGame",
  async ({ userId, gameId, buyIn, seatId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/join/${gameId}/${seatId}`,
        { userId, buyIn }
      );
      console.log("Join Called & response:", response);
      dispatch(fetchUpdatedUser(userId));

      return response.data.game;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const playerJoined = createAsyncThunk(
  "games/playerJoined",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const leaveGame = createAsyncThunk(
  "games/leaveGame",
  async ({ gameId, userId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/leave/${gameId}/${userId}`
      );
      console.log("leave response:", response.data);
      dispatch(fetchUpdatedUser(userId));

      return response.data.game;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const playerLeft = createAsyncThunk(
  "games/leaveGame",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const dealCards = createAsyncThunk(
  "games/dealCards",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/deal-cards/${gameId}`
      );
      console.log("Deal cards response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const cardsDealt = createAsyncThunk(
  "games/cardsDealt",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const dealFlop = createAsyncThunk(
  "games/dealFlop",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:4000/flop/${gameId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const flopDealt = createAsyncThunk(
  "games/flopDealt",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const dealTurn = createAsyncThunk(
  "games/dealTurn",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/turn/${gameId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const turnDealt = createAsyncThunk(
  "games/turnDealt",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const dealRiver = createAsyncThunk(
  "games/dealRiver",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/river/${gameId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const riverDealt = createAsyncThunk(
  "games/riverDealt",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const endGame = createAsyncThunk(
  "games/endGame",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/endgame/${gameId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const gameEnded = createAsyncThunk(
  "games/endedGame",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const getWinner = createAsyncThunk(
  "games/fetchGameDetails",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/winner/${gameId}`
      );
      console.log("Fetch Game Details Called & Response.Data:", response.data);
      const { players, winners } = response.data;

      return { players, winners };
    } catch (err) {
      console.error("Error in fetchGameDetails:", err);
      return rejectWithValue(
        err.message ? err.message : "Unknown error in fetchGameDetails"
      );
    }
  }
);

export const winnerReceived = createAsyncThunk(
  "games/winnerReceived",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const chipsToPot = createAsyncThunk(
  "games/transferToPot",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/game/${data.gameId}/toPot`,
        data
      );
      return response.data;
    } catch (err) {
      console.error("Error in transferToPot:", err);
      let errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown error in transferToPot";
      return rejectWithValue(errorMessage);
    }
  }
);

export const chipsCollected = createAsyncThunk(
  "games/chipsCollected",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const potToPlayer = createAsyncThunk(
  "games/collectPot",
  async ({ gameId, seatId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/game/${gameId}/getPot`,
        { seatId }
      );
      return response.data;
    } catch (err) {
      console.error("Error in collectPot:", err);
      return rejectWithValue(
        err.response.data ? err.response.data : "Unknown error in collectPot"
      );
    }
  }
);

export const potCollected = createAsyncThunk(
  "games/potCollected",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const updatePositionsAndBlinds = createAsyncThunk(
  "games/updatePositionsAndBlinds",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/${gameId}/updatePostionsAndBlinds`
      );
      console.log("Update positions and blinds response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatedBlinds = createAsyncThunk(
  "games/blindsUpdated",
  async (updatedGame) => {
    return updatedGame;
  }
);

export const updateCurrentPlayer = createAsyncThunk(
  "games/updateCurrentPlayer",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/${gameId}/updateCurrentPlayer`
      );
      console.log("Update current player response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const playerUpdated = createAsyncThunk(
  "games/playerUpdated",
  async (updatedGame) => {
    return updatedGame;
  }
);

const serverSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    currentGame: null,
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch games";
      })
      .addCase(joinGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedGame = action.payload;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to join game";
      })
      .addCase(playerJoined.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(leaveGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveGame.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
        state.joinedGame = null;

        const leftGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (leftGameIndex > -1) {
          state.games[leftGameIndex] = action.payload;
        }
      })
      .addCase(leaveGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to leave game";
      })

      .addCase(dealCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(dealCards.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(dealCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to deal cards";
      })
      .addCase(cardsDealt.fulfilled, (state, action) => {
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(dealFlop.pending, (state) => {
        state.loading = true;
      })
      .addCase(dealFlop.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(dealFlop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to deal flop";
      })
      .addCase(flopDealt.fulfilled, (state, action) => {
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })

      .addCase(dealTurn.pending, (state) => {
        state.loading = true;
      })
      .addCase(dealTurn.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(dealTurn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to deal turn";
      })
      .addCase(turnDealt.fulfilled, (state, action) => {
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })

      .addCase(dealRiver.pending, (state) => {
        state.loading = true;
      })
      .addCase(dealRiver.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(dealRiver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to deal river";
      })
      .addCase(riverDealt.fulfilled, (state, action) => {
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(endGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(endGame.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(endGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to end game";
      })
      .addCase(gameEnded.fulfilled, (state, action) => {
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })

      .addCase(getWinner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWinner.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(getWinner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch game details";
      })
      .addCase(winnerReceived.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(chipsToPot.pending, (state) => {
        state.loading = true;
      })
      .addCase(chipsToPot.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(chipsToPot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to transfer to pot";
      })

      .addCase(potToPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(potToPlayer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(potToPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to collect pot";
      })

      .addCase(updatePositionsAndBlinds.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePositionsAndBlinds.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(updatePositionsAndBlinds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update positions and blinds";
      })
      .addCase(updatedBlinds.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(updateCurrentPlayer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      })
      .addCase(updateCurrentPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCurrentPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update current player";
      })
      .addCase(playerUpdated.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGameIndex = state.games.findIndex(
          (game) => game._id === action.payload._id
        );
        if (updatedGameIndex > -1) {
          state.games[updatedGameIndex] = action.payload;
        }
      });
  },
});

export default serverSlice.reducer;
