import {
  GET_INFO_THEATER_SYS_REQUEST,
  GET_INFO_THEATER_SYS_FAILURE,
  GET_INFO_THEATER_SYS_SUCCESS,
} from "../constants/getInfoTheaterSys";
import theaterAPI from "../../services/theaterAPI";

export function getInfoTheaterSysAction() {
  return async (dispatch) => {
    dispatch({ type: GET_INFO_THEATER_SYS_REQUEST });
    try {
      const { data } = await theaterAPI.getInfoTheaterSys();
      dispatch({ type: GET_INFO_THEATER_SYS_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_INFO_THEATER_SYS_FAILURE,
        payload: { error: error },
      });
    }
  };
}
