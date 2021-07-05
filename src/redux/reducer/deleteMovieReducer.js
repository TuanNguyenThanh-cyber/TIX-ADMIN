import {
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILURE,
} from "../constants/deleteMovieConstant";

const initialState = {
  dataDeleteMovie: null,
  Loading: false,
  error: null,
};

function deleteMovieReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_MOVIE_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case DELETE_MOVIE_SUCCESS: {
      return { ...state, Loading: false, dataDeleteMovie: action.payload.data };
    }
    case DELETE_MOVIE_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default deleteMovieReducer;
