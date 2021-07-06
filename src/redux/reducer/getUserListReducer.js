import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
} from "../constants/getUserListConstant";

const initialState = {
  dataUserList: null,
  Loading: false,
  error: null,
};

function getUserListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case GET_USER_LIST_SUCCESS: {
      return { ...state, Loading: false, dataUserList: action.payload.data };
    }
    case GET_USER_LIST_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default getUserListReducer;
