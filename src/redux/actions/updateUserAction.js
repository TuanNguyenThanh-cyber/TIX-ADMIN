import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../constants/updateUserConstant";
import userAPI from "../../services/userAPI";
import Swal from "sweetalert2";

export function updateUserAction(value) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const { data } = await userAPI.updateUser(value);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { data } });
      Swal.fire("Update User Successful !", "TIX ADMIN", "success");
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error: error.response.data },
      });
      Swal.fire(error.response.data, "TIX ADMIN", "error");
    }
  };
}
