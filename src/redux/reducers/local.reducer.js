import * as types from "../types/contract.types";

const INITIAL_STATE = {
  loading_MainData: false,
  loading_PoolPosition,
  mainData: null,
  poolPosition: null,
  error: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_MAIN_DATA_LOADING:
      return { ...state, loading_MainData: action.payload, error: "" };
    case types.GET_MAIN_DATA_SUCCESS:
      return { ...state, mainData: action.payload, error: "", loading: false };
    case types.GET_MAIN_DATA_ERROR:
      return { ...state, error: action.payload, loading: false };

    case types.GET_POOL_POSITION_LOADING:
      return { ...state, loading_PoolPosition: action.payload, error: "" };
    case types.GET_MAIN_DATA_SUCCESS:
      return {
        ...state,
        poolPosition: action.payload,
        error: "",
        loading: false,
      };
    case types.GET_MAIN_DATA_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default userReducer;
