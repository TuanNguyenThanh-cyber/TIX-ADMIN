import {
  GET_MOVIE_SHOWTIME_REQUEST,
  GET_MOVIE_SHOWTIME_SUCCESS,
  GET_MOVIE_SHOWTIME_FAILURE,
} from "../constants/getMovieShowTime";

const initialState = {
  dataMovieShowTime: null,
  Loading: false,
  error: null,
};

function getMovieShowTimeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_SHOWTIME_REQUEST: {
      return { ...state, Loading: true, error: null };
    }
    case GET_MOVIE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        Loading: false,
        dataMovieShowTime: action.payload.data,
      };
    }
    case GET_MOVIE_SHOWTIME_FAILURE: {
      return { ...state, Loading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export default getMovieShowTimeReducer;
