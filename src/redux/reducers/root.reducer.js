import { combineReducers } from "redux";
import localReducer from "./local.reducer";
import contractReducer from "./contract.reducer";
// import authReducer from './auth.reducer';

const rootReducer = combineReducers({
  localReducer,
  contractReducer,
});

export default rootReducer;
