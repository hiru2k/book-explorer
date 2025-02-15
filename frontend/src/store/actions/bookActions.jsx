import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosInstance";
import { BOOK_API } from "../../apis/bookApis";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ genre = "", author = "" }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${BOOK_API.FETCH_BOOKS}?${genre ? `&genre=${genre}` : ""}${
          author ? `&author=${author}` : ""
        }`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch books"
      );
    }
  }
);

export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ bookData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(BOOK_API.CREATE_BOOK, bookData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to create book"
      );
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(BOOK_API.UPDATE_BOOK(id), bookData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update book"
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(BOOK_API.DELETE_BOOK(id));
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to delete book"
      );
    }
  }
);
