import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../constants/deleteUserConstant";
import userAPI from "../../services/userAPI";
import Swal from "sweetalert2";

export function deleteUserAction(value) {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const { data } = await userAPI.deleteUser(value);
      dispatch({ type: DELETE_USER_SUCCESS, payload: { data } });
      Swal.fire("Delete User Successful !", "TIX ADMIN", "success");
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: { error: error.response.data },
      });
      Swal.fire(error.response.data, "TIX ADMIN", "error");
    }
  };
}
