import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ page = 1, genre = "", author = "", token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/books?limit=${page * 35}${genre ? `&genre=${genre}` : ""}${
          author ? `&author=${author}` : ""
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

export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ bookData, token }, { rejectWithValue }) => {
    try {
      const bookWithDetails = {
        ...bookData,
        author: bookData.author,
        genre: bookData.genre,
      };

      const res = await axiosInstance.post("/api/books", bookWithDetails, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

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

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/api/books/${id}`, {
        headers: { Authorization: token },
      });
      return id;
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
