import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/registerConstant";

const initialState = {
  dataRegister: null,
  Loading: false,
  error: null,
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case REGISTER_SUCCESS: {
      return { ...state, Loading: false, dataRegister: action.payload.data };
    }
    case REGISTER_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default registerReducer;
