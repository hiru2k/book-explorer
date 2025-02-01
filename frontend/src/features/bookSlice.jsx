import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api";

// Async Thunks for fetching books (with filtering, pagination, etc.)
export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ page = 1, genre = "", author = "", token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/books?limit=${page * 35}${genre ? `&genre=${genre}` : ""}${
          author ? `&author=${author}` : "" // Fetch books for specific author if provided
        }`,
        {
          headers: { Authorization: token },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

// Async Thunk for creating a book
export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ bookData, token, userId }, { rejectWithValue }) => {
    try {
      // Add logged-in user's ID as author and selected genre ID to book data
      const bookWithDetails = {
        ...bookData,
        author: bookData.author, // Correct reference
        genre: bookData.genre, // Selected genre ID
      };
      // console.log("sdsdsdsdsd");
      console.log(token);
      const res = await axiosInstance.post("/api/books", bookWithDetails, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred"); // Pass error message as a string
    }
  }
);

// Async Thunk for updating a book
export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, bookData, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/api/books/${id}`, bookData, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

// Async Thunk for deleting a book
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/api/books/${id}`, {
        headers: { Authorization: token },
      });
      return id; // Return the deleted book ID
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    error: null,
    callback: false,
    genre: "",

    page: 1,
    result: 0,
  },
  reducers: {
    setGenreFilter: (state, action) => {
      state.genre = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCallback: (state) => {
      state.callback = !state.callback;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.books;
      state.result = action.payload.result;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false;
      state.books = state.books.filter((book) => book._id !== action.payload);
      state.callback = !state.callback;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBook.fulfilled, (state) => {
      state.loading = false;
      state.callback = !state.callback; // Trigger refetch in Books component
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBook.fulfilled, (state) => {
      state.loading = false;
      state.callback = !state.callback; // Trigger refetch in Books component
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setGenreFilter, setPage, setCallback } = bookSlice.actions;
export default bookSlice.reducer;
