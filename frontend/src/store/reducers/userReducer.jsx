import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  fetchUser,
  logoutUser,
} from "../actions/userActions";

const initialState = {
  isLogged: false,
  accessToken: null,
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isLogged = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isLogged = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLogged = false;
        state.user = null;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLogged = false;
      state.user = null;
      state.accessToken = null;
    });
  },
});

export default userSlice.reducer;
