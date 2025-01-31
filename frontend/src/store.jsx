import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import genreReducer from "./features/genreSlice";
import bookReducer from "./features/bookSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    genre: genreReducer,
    book: bookReducer,
  },
});

export default store;
