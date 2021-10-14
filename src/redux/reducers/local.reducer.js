import * as types from "../types/local.types";

const INITIAL_STATE = {
  loading_MainData: false,
  error: "",
  balanceEth: 0.0,

  phnxPerEth: 0,
  ethPerPhnx: 0,
  reserve0: 0,
  reserve1: 0,
};

const localReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_MAIN_DATA_LOADING:
      return { ...state, loading_MainData: action.payload, error: "" };
    case types.GET_MAIN_DATA_SUCCESS:
      return {
        ...state,
        error: "",
        loading_MainData: false,
        phnxPerEth: action.payload.route.midPrice.toSignificant(6),
        ethPerPhnx: action.payload.route.midPrice.invert().toSignificant(6),
        reserve0: action.payload.pair.reserveO,
        reserve1: action.payload.pair.reserve1.toFixed(2),
      };
    case types.GET_MAIN_DATA_ERROR:
      return { ...state, error: action.payload, loading_MainData: false };

    case types.ETH_BALANCE_SUCCESS:
      return { ...state, balanceEth: action.payload, error: "" };
    case types.ETH_BALANCE_ERROR:
      return { ...state, error: action.payload };

    case types.RESET_ALL_LOCAL_REDUCER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default localReducer;
