import {
  GET_INFO_THEATER_CLUSTER_SYS_REQUEST,
  GET_INFO_THEATER_CLUSTER_SYS_FAILURE,
  GET_INFO_THEATER_CLUSTER_SYS_SUCCESS,
} from "../constants/getInfoTheaterClusterSys";
import theaterAPI from "../../services/theaterAPI";

export function getInfoTheaterClusterSysAction(value) {
  return async (dispatch) => {
    dispatch({ type: GET_INFO_THEATER_CLUSTER_SYS_REQUEST });
    try {
      const { data } = await theaterAPI.getInfoTheaterClusterSys(value);
      dispatch({
        type: GET_INFO_THEATER_CLUSTER_SYS_SUCCESS,
        payload: { data },
      });
    } catch (error) {
      dispatch({
        type: GET_INFO_THEATER_CLUSTER_SYS_FAILURE,
        payload: { error: error },
      });
    }
  };
}
