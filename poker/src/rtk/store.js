import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
import deckReducer from "./slices/gameSlice"

export default configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
    deck: deckReducer
  }
});