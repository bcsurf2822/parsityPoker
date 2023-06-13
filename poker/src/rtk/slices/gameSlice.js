import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { convertRank, convertSuit } from "../../actions/cardConvert";

export const startNewGame = createAsyncThunk(
  "deck/startNewGame",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:4000/startNewGame");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const drawCard = createAsyncThunk(
  "deck/drawCard",
  async ({ deckId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/drawCard/${deckId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDeck = createAsyncThunk(
  "deck/getDeck",
  async ({ deckId }, thunkAPI) => {
    try {
      console.log(deckId); // log deckId
      const response = await axios.get(`http://localhost:4000/deck/${deckId}`);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Support 6 players right now
export const dealCards = createAsyncThunk(
  "deck/dealCards",
  async ({ deckId }, thunkAPI) => {
    try {
      const deckResponse = await axios.get(
        `http://localhost:4000/deck/${deckId}`
      );
      const deck = deckResponse.data.cards;

      let players = [];
      let dealtCardsIndexes = [];
      let communityCards = [];
      let skippedCards = [];

      for (let round = 0; round < 2; round++) {
        for (let player = 0; player < 6; player++) {
          const cardIndex = 6 * round + player;
          if (!players[player]) players[player] = { id: player + 1, cards: [] };
          players[player].cards.push(deck[cardIndex]);
          dealtCardsIndexes.push(cardIndex);
        }
      }

      // Skip card 12
      skippedCards.push(deck[12]);
      dealtCardsIndexes.push(12);
      // Deal the flop
      communityCards.push(deck[13], deck[14], deck[15]);

      // Skip a card before dealing the turn
      skippedCards.push(deck[16]);
      // Deal the turn
      communityCards.push(deck[17]);

      // Skip a card before dealing the river
      skippedCards.push(deck[18]);
      // Deal the river
      communityCards.push(deck[19]);
      dealtCardsIndexes.push(12, 13, 14, 15, 16, 17, 18, 19);

      return { players, dealtCardsIndexes, communityCards, skippedCards };
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//POKER API to determine winner
export const getWinner = createAsyncThunk(
  "deck/getWinner",
  async ({ communityCards, playerCards }, thunkAPI) => {
    console.log('communityCards', communityCards);  // Debug line
    console.log('playerCards', playerCards);
    try {
      let cc = communityCards.map((card) => `${convertRank(card.rank)}${convertSuit(card.suit)}`).join(",");
      let pc = playerCards
        .map((player) => player.cards.map((card) => `${convertRank(card.rank)}${convertSuit(card.suit)}`).join(","))
        .join("&pc[]=");

        let url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${cc}&pc[]=${pc}`;

      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const dealToPlayers = createAsyncThunk(
  "deck/dealToPlayers",
  async ({ deckId }, thunkAPI) => {
    // Get current state
    const state = thunkAPI.getState().deck;
    const deck = state.deck;

    let players = [];
    let dealtCardsIndexes = [];

    for (let round = 0; round < 2; round++) {
      for (let player = 0; player < 6; player++) {
        const cardIndex = 6 * round + player;
        if (!players[player]) players[player] = { id: player + 1, cards: [] };
        players[player].cards.push(deck[cardIndex]);
        dealtCardsIndexes.push(cardIndex);
      }
    }

    return { players, dealtCardsIndexes };
  }
);

// The thunk to reveal the flop
export const revealFlop = createAsyncThunk(
  "deck/revealFlop",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().deck;
    const deck = state.deck;
    const dealtCardsIndexes = [...state.dealtCardsIndexes];

    let communityCards = [];
    let skippedCards = [];

    // Skip card 12
    skippedCards.push(deck[12]);
    dealtCardsIndexes.push(12);
    // Deal the flop
    communityCards.push(deck[13], deck[14], deck[15]);
    dealtCardsIndexes.push(13, 14, 15);

    return { communityCards, skippedCards, dealtCardsIndexes };
  }
);

// The thunk to reveal the turn
export const revealTurn = createAsyncThunk(
  "deck/revealTurn",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().deck;
    const deck = state.deck;
    const dealtCardsIndexes = [...state.dealtCardsIndexes];
    const communityCards = [...state.communityCards];
    const skippedCards = [...state.skippedCards];

    // Skip a card before dealing the turn
    skippedCards.push(deck[16]);
    dealtCardsIndexes.push(16);
    // Deal the turn
    communityCards.push(deck[17]);
    dealtCardsIndexes.push(17);

    return { communityCards, skippedCards, dealtCardsIndexes };
  }
);

// The thunk to reveal the river
export const revealRiver = createAsyncThunk(
  "deck/revealRiver",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().deck;
    const deck = state.deck;
    const dealtCardsIndexes = [...state.dealtCardsIndexes];
    const communityCards = [...state.communityCards];
    const skippedCards = [...state.skippedCards];

    // Skip a card before dealing the river
    skippedCards.push(deck[18]);
    dealtCardsIndexes.push(18);
    // Deal the river
    communityCards.push(deck[19]);
    dealtCardsIndexes.push(19);

    return { communityCards, skippedCards, dealtCardsIndexes };
  }
);
//--For support of Less Players **
// export const dealCards = createAsyncThunk(
//   "deck/dealCards",
//   async ({ deckId, numPlayers }, thunkAPI) => {
//     try {
//       // ...

//       // Set number of players
//       let players = Array(numPlayers).fill(null).map((_, index) => ({ id: index + 1, cards: [] }));

//       for (let round = 0; round < 2; round++) {
//         for (let playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
//           const cardIndex = numPlayers * round + playerIndex;
//           players[playerIndex].cards.push(deck[cardIndex]);
//           dealtCardsIndexes.push(cardIndex);
//         }
//       }

//       // Deal community cards and add skipped cards in the same way
//       // ...

//       return { players, dealtCardsIndexes, communityCards, skippedCards };

//     } catch (error) {
//       // ...
//     }
//   }
// );

const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deckId: null,
    card: null,
    deck: [],
    players: [],
    dealtCardsIndexes: [],
    communityCards: [],
    skippedCards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startNewGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startNewGame.fulfilled, (state, action) => {
        state.deckId = action.payload.deckId;
        state.loading = false;
      })
      .addCase(startNewGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(drawCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(drawCard.fulfilled, (state, action) => {
        state.card = action.payload;
        state.loading = false;
      })
      .addCase(drawCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDeck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeck.fulfilled, (state, action) => {
        state.deck = action.payload.cards; // assuming the response has the entire deck of cards
        state.loading = false;
      })
      .addCase(getDeck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(dealCards.fulfilled, (state, action) => {
        state.players = action.payload.players;
        state.dealtCardsIndexes = action.payload.dealtCardsIndexes;
        state.communityCards = action.payload.communityCards; // add community cards to state
        state.skippedCards = action.payload.skippedCards; // add skipped cards to state
        state.loading = false;
      })
      .addCase(dealToPlayers.fulfilled, (state, action) => {
        state.players = action.payload.players;
        state.dealtCardsIndexes = action.payload.dealtCardsIndexes;
      })
      .addCase(revealFlop.fulfilled, (state, action) => {
        state.communityCards = action.payload.communityCards; // add community cards to state
        state.skippedCards = action.payload.skippedCards; // add skipped cards to state
        state.dealtCardsIndexes = action.payload.dealtCardsIndexes;
      })
      .addCase(revealTurn.fulfilled, (state, action) => {
        state.communityCards = action.payload.communityCards; // add community cards to state
        state.skippedCards = action.payload.skippedCards; // add skipped cards to state
        state.dealtCardsIndexes = action.payload.dealtCardsIndexes;
      })
      .addCase(revealRiver.fulfilled, (state, action) => {
        state.communityCards = action.payload.communityCards; // add community cards to state
        state.skippedCards = action.payload.skippedCards; // add skipped cards to state
        state.dealtCardsIndexes = action.payload.dealtCardsIndexes;
      })
      .addCase(getWinner.fulfilled, (state, action) => {
        state.winner = action.payload;
      });
  },
});

export default deckSlice.reducer;
