import {
  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
} from "../constants/addMovieConstant";
import filmAPI from "../../services/filmAPI";
import Swal from "sweetalert2";

export function addMovieAction(value) {
  return async (dispatch) => {
    dispatch({ type: ADD_MOVIE_REQUEST });
    try {
      const { data } = await filmAPI.addMovie(value);
      dispatch({ type: ADD_MOVIE_SUCCESS, payload: { data } });
      Swal.fire("Add Movie Successful !", "TIX ADMIN", "success").then((result) => {
        if(result.isConfirmed){
          window.location.reload();
        }
      });;
    } catch (error) {
      dispatch({
        type: ADD_MOVIE_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
