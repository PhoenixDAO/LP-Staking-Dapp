import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./reducer/root.reducer";
// import AsyncStorage from '@react-native-community/async-storage';
// import logger from 'redux-logger';

const middleware = applyMiddleware(thunk);

const persistedConfig = {
	key: "root",
	storage: localStorage,
	// blacklist: ['authReducer', 'userReducer', 'homeReducer'],
	// blacklist: ['userReducer', 'homeReducer'],
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);
const store = createStore(persistedReducer, middleware);
const persister = persistStore(store);

export { store, persister };
