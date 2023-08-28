import { setLastAction } from "../slices/duplicateSlice";

const preventDuplicateMiddleware = store => next => action => {
  const lastAction = store.getState().preventDublicate;

  const currentTime = Date.now();

  // Block the duplicate action if the same action type is dispatched within a short interval (e.g., 1000ms).
  if (lastAction && lastAction.type === action.type && (currentTime - lastAction.timestamp) < 1000) {
      return;  // block action
  }

  next(action);
  store.dispatch(setLastAction({ type: action.type, timestamp: currentTime }));
};

export default preventDuplicateMiddleware;
