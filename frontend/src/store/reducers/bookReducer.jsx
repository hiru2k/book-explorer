import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../actions/bookActions";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    genre: "",
  },
  reducers: {
    setGenreFilter: (state, action) => {
      state.genre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.books;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false;
      state.books = state.books.filter((book) => book._id !== action.payload);
    });
    builder.addCase(deleteBook.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBook.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createBook.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBook.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBook.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setGenreFilter } = bookSlice.actions;
export default bookSlice.reducer;
