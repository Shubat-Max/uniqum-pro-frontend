import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

import thunk from "redux-thunk";
import randomid from "../middlewares/randomid";

/**
 * Store Configuration
 */
export const configureStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, randomid))
  );
};
