import * as types from "../types/local.types";

const INITIAL_STATE = {
  loading_MainData: false,
  mainData: null,
  error: "",
};

const localReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
