import * as types from "../types/contract.types";
import {
  getPoolPosition,
  checkApproval,
  giveApproval,
  getPhnxBalance,
  phnxContractInit,
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

// export const loginUserAction = (email, password, navigation) => {
// 	console.log("loginUserAction is calling");
// 	return async (dispatch) => {
// 		dispatch({
// 			type: LOGIN_USER_LOADING,
// 			payload: true,
// 		});
// 		try {
// 			let response = await loginUser(email, password);
// 			console.log(response.data, "login response");
// 			dispatch({
// 				type: LOGIN_USER_SUCCESS,
// 				payload: response.data,
// 			});
// 			// alert('Login user success')
// 			SetLocalItem("token", response?.data?.token);
// 			SetLocalItem("uid", response?.data?.user?._id);
// 			navigation.navigate("AppNavigator");
// 		} catch (e) {
// 			dispatch({
// 				type: LOGIN_USER_ERROR,
// 				payload: e?.response?.data?.message || e.message,
// 			});
// 		}
// 	};
// };

// export const getLoggedInUserAction = (userId) => {
// 	return async (dispatch) => {
// 		dispatch({
// 			type: GET_USER_LOADING,
// 			payload: true,
// 		});
// 		try {
// 			let token = await GetLocalItem("token");
// 			let response = await getLoggedInUser(token, userId);
// 			console.log(response.data, "Response of getLoggedInUser()");
// 			dispatch({
// 				type: GET_LOGGEDIN_USER_SUCESS,
// 				payload: response?.data,
// 			});
// 		} catch (e) {
// 			console.log(e, "Error in getLoggedInUser api request");
// 			dispatch({
// 				type: GET_LOGGEDIN_USER_ERROR,
// 				payload: e?.response?.data?.message || e.message,
// 			});
// 		}
// 	};
// };
