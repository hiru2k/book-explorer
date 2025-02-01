import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", userData);
      const accessToken = res.data.accesstoken; // Assuming the access token is in res.data.accessToken

      localStorage.setItem("firstLogin", true); // Store login state in localStorage
      //   console.log(localStorage.getItem("firstLogin"));
      //   console.log("jhskhkjshkjhhhhhhhh");
      // Fetch user data immediately after login
      dispatch(fetchUser(accessToken));
      return { accessToken };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

// Fetch User Data
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/infor", {
        headers: { Authorization: token },
      });
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch user");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await axiosInstance.get("/user/logout");
  localStorage.removeItem("firstLogin");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    accessToken: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;

        state.accessToken = action.payload.accessToken; // Store access token
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogged = false;
        state.error = action.payload;
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
      localStorage.removeItem("accesstoken");
    });
  },
});

export default userSlice.reducer;
