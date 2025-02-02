import { createSlice } from "@reduxjs/toolkit";
import { fetchGenres } from "../actions/genreActions";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genres: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.genres = action.payload;
    });
    builder.addCase(fetchGenres.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default genreSlice.reducer;
