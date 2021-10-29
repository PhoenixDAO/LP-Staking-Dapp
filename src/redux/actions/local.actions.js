import * as types from "../types/local.types";
import { getDataMain, getEthBalance } from "../../services/pool.services";
import { getUserInfo } from "../../services/stake.services";

export const GetMainDataAction = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_MAIN_DATA_LOADING,
      // payload: response?.data,
    });
    try {
      let response = await getDataMain();
      // console.log("GetMainDataAction response", response);
      dispatch({
        type: types.GET_MAIN_DATA_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.GET_MAIN_DATA_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const GetEthBalanceAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await getEthBalance(web3context);
      // console.log(response);

      // console.log("GetEthBalaceAction response", response);
      dispatch({
        type: types.ETH_BALANCE_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.ETH_BALANCE_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

export const GetUserInfoAction = (contractPhnxStake, web3context) => {
  return async (dispatch) => {
    try {
      let response = await getUserInfo(contractPhnxStake, web3context);
      // console.log("res in GetUserInfoAction", response);
      dispatch({
        type: types.GET_USER_INFO_SUCCESS,
        payload: response,
      });
    } catch (e) {
      // console.log("Err at GetUserInfoAction", e);
      dispatch({
        type: types.GET_USER_INFO_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};
