import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
} from "../constants/getUserListConstant";
import userAPI from "../../services/userAPI";

export function getUserListAction() {
  return async (dispatch) => {
    dispatch({ type: GET_USER_LIST_REQUEST });
    try {
      const { data } = await userAPI.getUserList();
      dispatch({ type: GET_USER_LIST_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_USER_LIST_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
