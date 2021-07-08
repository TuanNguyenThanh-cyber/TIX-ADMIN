import {
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  CREATE_SHOWTIME_FAILURE,
} from "../constants/createShowTimeConstant";

const initialState = {
  dataCreateShowTime: null,
  Loading: false,
  error: null,
};

function createShowTimeReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SHOWTIME_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case CREATE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        Loading: false,
        dataCreateShowTime: action.payload.data,
      };
    }
    case CREATE_SHOWTIME_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default createShowTimeReducer;
