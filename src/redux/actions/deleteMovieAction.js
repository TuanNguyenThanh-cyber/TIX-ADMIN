import {
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILURE,
} from "../constants/deleteMovieConstant";
import filmAPI from "../../services/filmAPI";
import Swal from "sweetalert2";

export function deleteMovieAction(value) {
  return async (dispatch) => {
    dispatch({ type: DELETE_MOVIE_REQUEST });
    try {
      const { data } = await filmAPI.deleteMovie(value);
      dispatch({ type: DELETE_MOVIE_SUCCESS, payload: { data } });
      Swal.fire("Delete Movie Successful !", "TIX ADMIN", "success");
    } catch (error) {
      dispatch({
        type: DELETE_MOVIE_FAILURE,
        payload: { error: error.response.data },
      });
      Swal.fire(error.response.data, "TIX ADMIN", "error");
    }
  };
}
