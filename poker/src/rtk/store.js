import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";
import deckReducer from "./slices/gameSlice";
import tableReducer from "./slices/tableSlice";
import bankingReducer from "./slices/bankingSlice";

export default configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
    deck: deckReducer,
    table: tableReducer,
    banking: bankingReducer,
  }
});