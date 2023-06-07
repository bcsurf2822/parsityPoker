import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./slices/authenticationSlice";
import registrationReducer from "./slices/registrationSlice";

export default configureStore({
  reducer: {
    auth: authenticationReducer,
    register: registrationReducer,
  }
});