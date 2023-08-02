import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
import deckReducer from "./slices/gameSlice";
import profileReducer from "./slices/profileSlice";
import serverReducer from "./slices/serverSlice";

export default configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
    deck: deckReducer,
    profile: profileReducer,
    server: serverReducer,
  }
});