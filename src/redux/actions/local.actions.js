import * as types from "../types/local.types";
import {
  getDataMain,
  getPoolPosition,
  checkApproval,
  giveApproval,
  supply,
} from "../../services/pool.services";
// import {} from '../../services/stake.services'

export const GetMainDataAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_MAIN_DATA_LOADING,
      // payload: response?.data,
    });
    try {
      let response = await getDataMain();
      console.log("GetMainDataAction response", response);
      dispatch({
        type: GET_MAIN_DATA_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_MAIN_DATA_ERROR,
        payload: e?.response?.data?.message || e.message,
      });
    }
  };
};

const GetPoolPositionAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_POOL_POSITION_LOADING,
      // payload: response?.data,
    });
    try {
      let response = await getPoolPosition();
      console.log("GetPoolPositionAction response", response);
      dispatch({
        type: GET_POOL_POSITION_SUCCESS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_POOL_POSITION_ERROR,
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
