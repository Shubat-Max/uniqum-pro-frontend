import { combineReducers } from "redux";
import groups from "./groups";
import users from "./users";
import system from "./system";

/**
 * Root reducer creator
 */
const rootReducer = combineReducers({
  users,
  groups,
  system
});

export default rootReducer;
