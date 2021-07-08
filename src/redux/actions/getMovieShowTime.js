import {
  GET_MOVIE_SHOWTIME_REQUEST,
  GET_MOVIE_SHOWTIME_SUCCESS,
  GET_MOVIE_SHOWTIME_FAILURE,
} from "../constants/getMovieShowTime";
import theaterAPI from "../../services/theaterAPI";

export function getMovieShowTimeAction(value) {
  return async (dispatch) => {
    dispatch({ type: GET_MOVIE_SHOWTIME_REQUEST });
    try {
      const { data } = await theaterAPI.getMovieShowTime(value);
      dispatch({ type: GET_MOVIE_SHOWTIME_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_MOVIE_SHOWTIME_FAILURE,
        payload: { error: error },
      });
    }
  };
}
