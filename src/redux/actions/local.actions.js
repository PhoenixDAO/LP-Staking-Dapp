import * as types from "../types/local.types";
import {
  getDataMain,
  getPoolPosition,
  checkApproval,
  giveApproval,
  supply,
  Web3Init,
} from "../../services/pool.services";
// import {} from '../../services/stake.services'

export const GetMainDataAction = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_MAIN_DATA_LOADING,
      // payload: response?.data,
    });
    try {
      let response = await getDataMain();
      console.log("GetMainDataAction response", response);
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

export const Web3InitAction = (web3context) => {
  return async (dispatch) => {
    try {
      let response = await Web3Init(web3context);
      console.log("Web3InitAction response", response);
      dispatch({
        type: types.WEB3_INIT_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: types.WEB3_INIT_ERROR,
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
