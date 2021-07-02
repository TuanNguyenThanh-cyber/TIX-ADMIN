import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";

const rootReducer = combineReducers({
  // Nơi khai báo các reducer con
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;
