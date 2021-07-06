import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../constants/updateUserConstant";

const initialState = {
  dataUpdateUser: null,
  Loading: false,
  error: null,
};

function updateUserReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case UPDATE_USER_SUCCESS: {
      return { ...state, Loading: false, dataUpdateUser: action.payload.data };
    }
    case UPDATE_USER_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default updateUserReducer;
