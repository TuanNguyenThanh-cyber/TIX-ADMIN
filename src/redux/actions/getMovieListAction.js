import {
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_FAILURE,
} from "../constants/getMovieListConstant";
import filmAPI from "../../services/filmAPI";
import Swal from "sweetalert2";

export function getMovieListAction() {
  return async (dispatch) => {
    dispatch({ type: GET_MOVIE_LIST_REQUEST });
    try {
      const { data } = await filmAPI.getMovieList();
      dispatch({ type: GET_MOVIE_LIST_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_MOVIE_LIST_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
