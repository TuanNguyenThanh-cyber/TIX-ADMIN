import {
  UPLOAD_MOVIE_REQUEST,
  UPLOAD_MOVIE_SUCCESS,
  UPLOAD_MOVIE_FAILURE,
} from "../constants/uploadMovieConstant";

const initialState = {
  dataUploadMovie: null,
  Loading: false,
  error: null,
};

function uploadMovieReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_MOVIE_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case UPLOAD_MOVIE_SUCCESS: {
      return { ...state, Loading: false, dataUploadMovie: action.payload.data };
    }
    case UPLOAD_MOVIE_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default uploadMovieReducer;
