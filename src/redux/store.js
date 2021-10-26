import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// import elements
import { rootReducer } from "./reducers/rootReducer";

const persistConfig = {
  // to tell react what states should be persist and where to locate them
  key: "root",
  storage,
  // blacklist: ["sideMenu"], // sideMenu will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);
