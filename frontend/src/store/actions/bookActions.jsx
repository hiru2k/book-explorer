// src/actions/bookActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosInstance";
import { BOOK_API } from "../../apis/bookApis";

// Fetch Books
export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ page = 1, genre = "", author = "", token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${BOOK_API.FETCH_BOOKS}?limit=${page * 35}${
          genre ? `&genre=${genre}` : ""
        }${author ? `&author=${author}` : ""}`,
        { headers: { Authorization: token } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch books"
      );
    }
  }
);

// Create Book
export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ bookData, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(BOOK_API.CREATE_BOOK, bookData, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to create book"
      );
    }
  }
);

// Update Book
export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, bookData, token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(BOOK_API.UPDATE_BOOK(id), bookData, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to update book"
      );
    }
  }
);

// Delete Book
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(BOOK_API.DELETE_BOOK(id), {
        headers: { Authorization: token },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to delete book"
      );
    }
  }
);
