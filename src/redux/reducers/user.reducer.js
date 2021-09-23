import {
	IS_LOADING,
	BANNER_SUCCESS,
	BANNER_ERROR,
} from "../action/user.action";

const INITIAL_STATE = {
	user: null,
	loading: false,
	error: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case IS_LOADING:
			return { ...state, loading: action.payload, error: "" };
		case BANNER_SUCCESS:
			return { ...state, banners: action.payload, error: "", loading: false };
		case BANNER_ERROR:
			return { ...state, error: action.payload, loading: false };

		default:
			return state;
	}
};

export default userReducer;
