import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import getMovieListReducer from "./getMovieListReducer";
import addMovieReducer from "./addMovieReducer";
import uploadMovieReducer from "./uploadMovieReducer";
import deleteMovieReducer from "./deleteMovieReducer";

const rootReducer = combineReducers({
  // Nơi khai báo các reducer con
  login: loginReducer,
  register: registerReducer,
  movieList: getMovieListReducer,
  addMovie: addMovieReducer,
  uploadMovie: uploadMovieReducer,
  deleteMovie: deleteMovieReducer,
});

export default rootReducer;
