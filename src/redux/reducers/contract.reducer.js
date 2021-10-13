import * as types from "../types/contract.types";

const INITIAL_STATE = {
  loading_PoolPosition: null,
  poolPosition: null,
  error: "",
  allowance1: null,
  loading_CheckApproval: false,
  balancePhnx: 0.0,
  contractPhnxDao: null,
  contractPhnxStake: null,
  contractUniswapPair: null,
  contractUniswapRouter: null,
};

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PHNX_BALANCE_SUCCESS:
      return { ...state, balancePhnx: action.payload, error: "" };
    case types.PHNX_BALANCE_ERROR:
      return { ...state, error: action.payload };

    case types.GET_POOL_POSITION_LOADING:
      return { ...state, loading_PoolPosition: action.payload, error: "" };
    case types.GET_POOL_POSITION_SUCCESS:
      return {
        ...state,
        poolPosition: action.payload,
        error: "",
        loading_PoolPosition: false,
      };
    case types.GET_POOL_POSITION_ERROR:
      return { ...state, error: action.payload, loading: false };

    case types.CHECK_APPROVAL_LOADING:
      return { ...state, loading_CheckApproval: action.payload, error: "" };
    case types.CHECK_APPROVAL_SUCCESS:
      return {
        ...state,
        allowance1: action.payload,
        error: "",
        loading_CheckApproval: false,
      };
    case types.CHECK_APPROVAL_ERROR:
      return { ...state, error: action.payload, loading: false };

    case types.PHNX_DAO_INIT_SUCCESS:
      return { ...state, contractPhnxDao: action.payload, error: "" };
    case types.PHNX_DAO_INIT_ERROR:
      return { ...state, error: action.payload };

    case types.PHNX_STAKE_INIT_SUCCESS:
      return { ...state, contractPhnxStake: action.payload, error: "" };
    case types.PHNX_STAKE_INIT_ERROR:
      return { ...state, error: action.payload };

    case types.UNISWAP_PAIR_INIT_SUCCESS:
      return { ...state, contractUniswapPair: action.payload, error: "" };
    case types.UNISWAP_PAIR_INIT_ERROR:
      return { ...state, error: action.payload };

    case types.UNISWAP_ROUTER_INIT_SUCCESS:
      return { ...state, contractUniswapRouter: action.payload, error: "" };
    case types.UNISWAP_ROUTER_INIT_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default contractReducer;
