import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import rootReducer from "./reducers/root.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      thunk
      // , logger
    )
  )
);
const persistor = persistStore(store);

export { store, persistor };
