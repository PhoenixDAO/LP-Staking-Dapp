import * as types from "../types/contract.types";
import {
  getPoolPosition,
  checkApproval,
  giveApproval,
  getPhnxBalance,
  phnxContractInit,
  uniswapV2PairInit,
  uniswapV2RouterInit,
} from "../../services/pool.services";

export const PhnxContractInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await phnxContractInit(web3context);
      console.log("PhnxContractInitAction response", response);
      dispatch({
        type: types.PHNX_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      console.log("err in action", e);
      dispatch({
        type: types.PHNX_INIT_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const UniswapContractPairInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await uniswapV2PairInit(web3context);
      console.log("UniswapContractPairInitAction response", response);
      dispatch({
        type: types.UNISWAP_PAIR_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.UNISWAP_PAIR_INIT_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const UniswapContractRouterInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await uniswapV2RouterInit(web3context);
      console.log("UniswapContractRouterInitAction response", response);
      dispatch({
        type: types.UNISWAP_ROUTER_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.UNISWAP_ROUTER_INIT_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const GetPoolPositionAction = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_POOL_POSITION_LOADING,
      // payload: response?.data,
    });
    try {
      let response = await getPoolPosition();
      console.log("GetPoolPositionAction response", response);
      dispatch({
        type: types.GET_POOL_POSITION_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.GET_POOL_POSITION_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const CheckApprovalAction = () => {
  return async (dispatch) => {
    dispatch({
      type: types.CHECK_APPROVAL_LOADING,
      // payload: response?.data,
    });
    try {
      let response = await checkApproval();
      console.log("CheckApprovalAction response", response);
      dispatch({
        type: types.CHECK_APPROVAL_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.CHECK_APPROVAL_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const GetPhnxBalanceAction = (web3context, contractPhnx) => {
  console.log("contractPhnx GetPhnxBalanceAction", contractPhnx);
  return async (dispatch) => {
    try {
      let response = await getPhnxBalance(web3context, contractPhnx);
      console.log("GetPhnxBalaceAction response", response);
      dispatch({
        type: types.PHNX_BALANCE_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.PHNX_BALANCE_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};
