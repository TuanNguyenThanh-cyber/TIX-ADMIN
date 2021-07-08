import {
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  CREATE_SHOWTIME_FAILURE,
} from "../constants/createShowTimeConstant";
import theaterAPI from "../../services/theaterAPI";
import Swal from "sweetalert2";

export function createShowTimeAction(value) {
  return async (dispatch) => {
    dispatch({ type: CREATE_SHOWTIME_REQUEST });
    try {
      const { data } = await theaterAPI.createShowTime(value);
      dispatch({ type: CREATE_SHOWTIME_SUCCESS, payload: { data } });
      Swal.fire("Tạo lịch chiếu thành công !", "TIX ADMIN", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    } catch (error) {
      dispatch({
        type: CREATE_SHOWTIME_FAILURE,
        payload: { error: error.response.data },
      });
      Swal.fire(error.response.data, "TIX ADMIN", "error");
    }
  };
}
