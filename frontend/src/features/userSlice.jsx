import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/register", userData);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", userData);
      const accessToken = res.data.accesstoken;
      localStorage.setItem("firstLogin", true);
      dispatch(fetchUser(accessToken));
      return { accessToken };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

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

        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogged = false;
        state.error = action.payload;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = false;
        // state.accessToken = action.payload.accessToken;
        // localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error);
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
