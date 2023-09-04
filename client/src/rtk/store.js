import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
// import deckReducer from "./slices/gameSlice";
import profileReducer from "./slices/profileSlice";
import serverReducer from "./slices/serverSlice";
import chatReducer from "./slices/chatSlice";
import deckOfCardsReducer from "./slices/deckOfCardsSlice";
import timingReducer from "./slices/timingSlice";
import { api } from "./slices/apiSlice";

// Create the store
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
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(api.middleware),  
});

export default store;
