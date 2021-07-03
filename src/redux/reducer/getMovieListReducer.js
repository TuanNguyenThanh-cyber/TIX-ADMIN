import {
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_FAILURE,
} from "../constants/getMovieListConstant";

const initialState = {
  dataMovieList: null,
  Loading: false,
  error: null,
};

function getMovieListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_LIST_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case GET_MOVIE_LIST_SUCCESS: {
      return { ...state, Loading: false, dataMovieList: action.payload.data };
    }
    case GET_MOVIE_LIST_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default getMovieListReducer;
