import { combineReducers } from "redux";

// Import Components
import directionSlice from "./directionReducer";
import { authReducer } from "./authReducer";
import { sideMenuReducer } from "./sideMenuReducer";
import langSlice from "./langReducer";

export const rootReducer = combineReducers({
  dir: directionSlice,
  auth: authReducer,
  sideMenu: sideMenuReducer,
  lang: langSlice,
});
