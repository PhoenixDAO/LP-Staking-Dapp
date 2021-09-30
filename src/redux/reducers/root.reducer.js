import { combineReducers } from "redux";
import userReducer from "./user.reducer";
// import authReducer from './auth.reducer';

const rootReducer = combineReducers({
	userReducer,
	// authReducer,
});

export default rootReducer;
