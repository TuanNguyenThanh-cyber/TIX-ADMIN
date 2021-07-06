import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "../constants/addUserConstant";

const initialState = {
  dataAddUser: null,
  Loading: false,
  error: null,
};

function addUserReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case ADD_USER_SUCCESS: {
      return { ...state, Loading: false, dataAddUser: action.payload.data };
    }
    case ADD_USER_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default addUserReducer;
