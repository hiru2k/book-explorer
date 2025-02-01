import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const fetchGenres = createAsyncThunk(
  "genre/fetchGenres",
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/genre", {
        headers: { Authorization: token },
      });
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [], // stores the list of genres
    loading: false, // indicates loading state for async actions
    error: null, // stores error message (if any)
  },
  reducers: {
    setGenre: (state, action) => {
      state.genres = action.payload; // updates genres in state
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

// Export the newly added actions
export const { setGenre } = genreSlice.actions;

export default genreSlice.reducer;
