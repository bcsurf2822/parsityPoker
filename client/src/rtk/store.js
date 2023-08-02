import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
import deckReducer from "./slices/gameSlice";
import profileReducer from "./slices/profileSlice";
import serverReducer from "./slices/serverSlice";
import chatReducer from "./slices/chatSlice";
import usersReducer from "./slices/usersSlice";

export default configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
    deck: deckReducer,
    profile: profileReducer,
    server: serverReducer,
    chat: chatReducer,
    users: usersReducer,
  }
});