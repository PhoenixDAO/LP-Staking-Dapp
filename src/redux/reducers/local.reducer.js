import * as types from "../types/local.types";

const INITIAL_STATE = {
  loading_MainData: false,
  mainData: null,
  error: "",
  web3: null,
};

const localReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.WEB3_INIT_SUCCESS:
      return { ...state, web3: action.payload, error: "" };
    case types.WEB3_INIT_ERROR:
      return { ...state, error: action.payload };

    case types.GET_MAIN_DATA_LOADING:
      return { ...state, loading_MainData: action.payload, error: "" };
    case types.GET_MAIN_DATA_SUCCESS:
      return {
        ...state,
        mainData: action.payload,
        error: "",
        loading_MainData: false,
      };
    case types.GET_MAIN_DATA_ERROR:
      return { ...state, error: action.payload, loading_MainData: false };

    default:
      return state;
  }
};

export default localReducer;
