import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
import profileReducer from "./slices/profileSlice";
import chatReducer from "./slices/chatSlice";
import timingReducer from "./slices/timingSlice";
import currentGameReducer from "./slices/currentGameSlice";
import allGamesReducer from "./slices/allGamesSlice";
import { socketMiddleware } from "./middleware/socketMiddleware";

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
    profile: profileReducer,
    chat: chatReducer,
    timing: timingReducer,
    currentGame: currentGameReducer,
    allGames: allGamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
