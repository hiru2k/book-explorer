import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/api";

export const fetchGenres = createAsyncThunk(
  "genre/fetchGenres",
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/genre", {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
    loading: false,
    error: null,
  },
  reducers: {
    setGenre: (state, action) => {
      state.genres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.genres = action.payload;
    });
    builder.addCase(fetchGenres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setGenre } = genreSlice.actions;
export default genreSlice.reducer;
