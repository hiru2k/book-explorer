import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookReducer from "./bookReducer";

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
});

export default rootReducer;
