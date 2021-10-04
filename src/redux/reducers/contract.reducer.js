import * as types from "../types/contract.types";

const INITIAL_STATE = {
  loading_PoolPosition: null,
  poolPosition: null,
  error: "",
};

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_POOL_POSITION_LOADING:
      return { ...state, loading_PoolPosition: action.payload, error: "" };
    case types.GET_POOL_POSITION_SUCCESS:
      return {
        ...state,
        poolPosition: action.payload,
        error: "",
        loading: false,
      };
    case types.GET_POOL_POSITION_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default contractReducer;
