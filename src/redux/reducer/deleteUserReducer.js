import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../constants/deleteUserConstant";

const initialState = {
  dataDeleteUser: null,
  Loading: false,
  error: null,
};

function deleteUserReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_USER_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case DELETE_USER_SUCCESS: {
      return { ...state, Loading: false, dataDeleteUser: action.payload.data };
    }
    case DELETE_USER_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default deleteUserReducer;
