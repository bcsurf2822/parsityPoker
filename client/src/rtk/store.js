import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
// import deckReducer from "./slices/gameSlice";
import profileReducer from "./slices/profileSlice";
import serverReducer from "./slices/serverSlice";
import chatReducer from "./slices/chatSlice";
import deckOfCardsReducer from "./slices/deckOfCardsSlice";
import timingReducer from "./slices/timingSlice";
import currentGameReducer from "./slices/currentGameSlice";
import allGamesReducer from "./slices/allGamesSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
    // deck: deckReducer,
    profile: profileReducer,
    server: serverReducer,
    chat: chatReducer,
    cards: deckOfCardsReducer,
    timing: timingReducer,
    currentGame: currentGameReducer,
    allGames: allGamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
