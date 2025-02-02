import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosInstance";
import { GENRE_API } from "../../apis/genreApis";

export const fetchGenres = createAsyncThunk(
  GENRE_API.FETCH_GENRES,
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GENRE_API.FETCH_GENRES, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch genres"
      );
    }
  }
);
