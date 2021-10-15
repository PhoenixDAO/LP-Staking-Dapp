import * as types from "../types/contract.types";
import {
  getPoolPosition,
  // checkApprovalPhnxDao,
  // giveApproval,
  getPhnxBalance,
  phnxDaoContractInit,
  phnxStakeContractInit,
  uniswapV2PairInit,
  uniswapV2RouterInit,
} from "../../services/pool.services";

export const PhnxDaoContractInitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await phnxDaoContractInit(web3context);
      console.log("PhnxDaoContractInitAction response", response);
      dispatch({
        type: types.PHNX_DAO_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      console.log("err in action", e);
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
      console.log("PhnxStakeContractInitAction response", response);
      dispatch({
        type: types.PHNX_STAKE_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      console.log("err in action", e);
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

export const GetPoolPositionAction = (web3context, contractUniswapPair) => {
  return async (dispatch) => {
    try {
      let response = await getPoolPosition(web3context, contractUniswapPair);
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

// export const CheckApprovalAction = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: types.CHECK_APPROVAL_LOADING,
//       // payload: response?.data,
//     });
//     try {
//       let response = await checkApproval();
//       console.log("CheckApprovalAction response", response);
//       dispatch({
//         type: types.CHECK_APPROVAL_SUCCESS,
//         payload: response,
//       });
//     } catch (e) {
//       dispatch({
//         type: types.CHECK_APPROVAL_ERROR,
//         payload: e?.response?.data?.message || e.message,
//       });
//     }
//   };
// };

export const GetPhnxBalanceAction = (web3context, contractPhnxDao) => {
  return async (dispatch) => {
    try {
      let response = await getPhnxBalance(web3context, contractPhnxDao);
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
