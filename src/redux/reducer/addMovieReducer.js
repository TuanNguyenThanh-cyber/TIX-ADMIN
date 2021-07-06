import {
  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
} from "../constants/addMovieConstant";

const initialState = {
  dataAddMovie: null,
  Loading: false,
  error: null,
};

function addMovieReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case ADD_MOVIE_SUCCESS: {
      return { ...state, Loading: false, dataAddMovie: action.payload.data };
    }
    case ADD_MOVIE_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default addMovieReducer;
