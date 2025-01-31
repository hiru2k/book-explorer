import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api";

// Async thunk for fetching genres
export const fetchGenres = createAsyncThunk(
  "genre/fetchGenres",
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/genre", {
        headers: { Authorization: token },
      });
      //   console.log(res.data);
      return res.data; // returns the genres from the API
    } catch (error) {
      return rejectWithValue(error.response.data.msg); // returns an error message
    }
  }
);

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [], // stores the list of genres
    searchQuery: "", // stores search query string (for setSearch example)
    loading: false, // indicates loading state for async actions
    error: null, // stores error message (if any)
  },
  reducers: {
    setGenre: (state, action) => {
      state.genres = action.payload; // updates genres in state
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload; // sets the search query
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
export const { setGenre, setSearch } = genreSlice.actions;

export default genreSlice.reducer;
