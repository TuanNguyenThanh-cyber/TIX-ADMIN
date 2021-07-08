import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import getMovieListReducer from "./getMovieListReducer";
import addMovieReducer from "./addMovieReducer";
import uploadMovieReducer from "./uploadMovieReducer";
import deleteMovieReducer from "./deleteMovieReducer";
import getUserListReducer from "./getUserListReducer";
import addUserReducer from "./addUserReducer";
import updateUserReducer from "./updateUserReducer";
import deleteUserReducer from "./deleteUserReducer";
import getMovieShowTimeReducer from "./getMovieShowTimeReducer";
import getInfoTheaterSysReducer from "./getInfoTheaterSysReducer";
import getInfoTheaterClusterSys from "./getInfoTheaterClusterSys";
import createShowTimeReducer from "./createShowTimeReducer";

const rootReducer = combineReducers({
  // Nơi khai báo các reducer con
  login: loginReducer,
  register: registerReducer,
  movieList: getMovieListReducer,
  addMovie: addMovieReducer,
  uploadMovie: uploadMovieReducer,
  deleteMovie: deleteMovieReducer,
  userList: getUserListReducer,
  addUser: addUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  movieShowTime: getMovieShowTimeReducer,
  infoTheaterSys: getInfoTheaterSysReducer,
  infoTheaterClusterSys: getInfoTheaterClusterSys,
  createShowTime: createShowTimeReducer,
});

export default rootReducer;
