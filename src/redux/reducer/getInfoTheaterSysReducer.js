import {
    GET_INFO_THEATER_SYS_REQUEST,
    GET_INFO_THEATER_SYS_SUCCESS,
    GET_INFO_THEATER_SYS_FAILURE
  } from "../constants/getInfoTheaterSys";
  
  const initialState = {
    dataInfoTheaterSys: null,
    Loading: false,
    error: null,
  };
  
  function getInfoTheaterSysReducer(state = initialState, action) {
    switch (action.type) {
      case GET_INFO_THEATER_SYS_REQUEST: {
        return { ...state, Loading: true, error: null };
      }
      case GET_INFO_THEATER_SYS_SUCCESS: {
        return { ...state, Loading: false, dataInfoTheaterSys: action.payload.data };
      }
      case GET_INFO_THEATER_SYS_FAILURE: {
        return { ...state, Loading: false, error: action.payload.error };
      }
      default:
        return state;
    }
  }
  
  export default getInfoTheaterSysReducer;
  