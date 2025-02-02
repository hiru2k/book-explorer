import { combineReducers } from "redux";
import userReducer from "./userReducer";
import genreReducer from "./genreReducer";
import bookReducer from "./bookReducer";

const rootReducer = combineReducers({
  user: userReducer,
  genre: genreReducer,
  book: bookReducer,
});

export default rootReducer;
