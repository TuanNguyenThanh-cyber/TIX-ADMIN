import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "../constants/addUserConstant";
import userAPI from "../../services/userAPI";
import Swal from "sweetalert2";

export function addUserAction(value) {
  return async (dispatch) => {
    dispatch({ type: ADD_USER_REQUEST });
    try {
      const { data } = await userAPI.addUser(value);
      dispatch({ type: ADD_USER_SUCCESS, payload: { data } });
      Swal.fire("Add User Successful !", "TIX ADMIN", "success");
    } catch (error) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: { error: error.response.data },
      });
      Swal.fire(error.response.data, "TIX ADMIN", "error");
    }
  };
}
