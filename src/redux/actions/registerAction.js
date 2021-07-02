import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/registerConstant";
import authAPI from "../../services/authAPI";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

export function registerAction(value) {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const { data } = await authAPI.register(value);
      dispatch({ type: REGISTER_SUCCESS, payload: { data } });
      Swal.fire(
        "Register Successfully !",
        "Please come back to login !",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          console.log("Redirect");
          // Fix Redirect here !
          window.location = "/admin/login";
        }
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
