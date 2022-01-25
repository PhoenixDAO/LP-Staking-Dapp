import * as types from "../types/contract.types";
import {
  getPoolPosition,
  getPhnxBalance,
  phnxDaoContractInit,
  phnxStakeContractInit,
  uniswapV2PairInit,
  uniswapV2RouterInit,
  checkApprovalUniswapPair,
  checkApprovalPhnxDao,
} from "../../services/pool.services";
import { checkApprovalPhnxStaking } from "../../services/stake.services";

export const PhnxDaoContractInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await phnxDaoContractInit(web3context);
      // console.log("PhnxDaoContractInitAction response", response);
      dispatch({
        type: types.PHNX_DAO_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      // console.log("err in action", e);
      dispatch({
        type: types.PHNX_DAO_INIT_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const PhnxStakeContractInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await phnxStakeContractInit(web3context);
      // console.log("PhnxStakeContractInitAction response", response);
      dispatch({
        type: types.PHNX_STAKE_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      // console.log("err in action", e);
      dispatch({
        type: types.PHNX_STAKE_INIT_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const UniswapContractPairInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await uniswapV2PairInit(web3context);
      // console.log("UniswapContractPairInitAction response", response);
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
      // console.log("UniswapContractRouterInitAction response", response);
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

export const GetPoolPositionAction = (web3context, contractUniswapPair) => {
  return async (dispatch) => {
    try {
      let response = await getPoolPosition(web3context, contractUniswapPair);
      // console.log("GetPoolPositionAction response", response);
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

export const CheckApprovalUniswapPairAction = (
  web3context,
  contractUniswapPair,
  setAllowance
) => {
  return async (dispatch) => {
    try {
      let response = await checkApprovalUniswapPair(
        web3context,
        contractUniswapPair
      );
      // console.log(response, "555555555");
      setAllowance(response);
      // console.log("CheckApprovalUniswapPairAction response", response);
      dispatch({
        type: types.CHECK_APPROVAL_UNISWAP_PAIR_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.CHECK_APPROVAL_UNISWAP_PAIR_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const CheckApprovalPhnxDaoAction = (
  web3context,
  contractPhnxDao,
  setApproveStatus
) => {
  return async (dispatch) => {
    try {
      let response = await checkApprovalPhnxDao(
        web3context,
        contractPhnxDao,
        setApproveStatus
      );
      // console.log("CheckApprovalPhnxDaoAction response", response);
      dispatch({
        type: types.CHECK_APPROVAL_PHNXDAO_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.CHECK_APPROVAL_PHNXDAO_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const CheckApprovalPhnxStakingAction = (
  web3context,
  contractUniswapPair,
  setApproveStatus
) => {
  return async (dispatch) => {
    try {
      let response = await checkApprovalPhnxStaking(
        web3context,
        contractUniswapPair,
        setApproveStatus
      );
      // setAllowance(response)
      // console.log("CheckApprovalPhnxStakingAction response", response);
      dispatch({
        type: types.CHECK_APPROVAL_PHNX_STAKING_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.CHECK_APPROVAL_PHNX_STAKING_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const GetPhnxBalanceAction = (web3context, contractPhnxDao) => {
  return async (dispatch) => {
    try {
      let response = await getPhnxBalance(web3context, contractPhnxDao);
      // console.log("GetPhnxBalaceAction response", response);
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
