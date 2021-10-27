import { combineReducers } from "redux";

// Import Components
import { directionReducer } from "./directionReducer";
import { authReducer } from "./authReducer";
import { sideMenuReducer } from "./sideMenuReducer";
import { LangReducer } from "./langReducer";

export const rootReducer = combineReducers({
  dir: directionReducer,
  auth: authReducer,
  sideMenu: sideMenuReducer,
  lang: LangReducer,
});
