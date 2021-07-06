import {
  UPLOAD_MOVIE_REQUEST,
  UPLOAD_MOVIE_SUCCESS,
  UPLOAD_MOVIE_FAILURE,
} from "../constants/uploadMovieConstant";
import filmAPI from "../../services/filmAPI";
import Swal from "sweetalert2";

export function uploadMovieAction(value) {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_MOVIE_REQUEST });
    try {
      const { data } = await filmAPI.uploadMovie(value);
      dispatch({ type: UPLOAD_MOVIE_SUCCESS, payload: { data } });
      Swal.fire("Update Movie Successful !", "TIX ADMIN", "success");
    } catch (error) {
      dispatch({
        type: UPLOAD_MOVIE_FAILURE,
        payload: { error: error.response.data },
      });
      Swal.fire(error.response.data, "TIX ADMIN", "error");
    }
  };
}
