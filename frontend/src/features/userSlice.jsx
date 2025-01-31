import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "http://localhost:8000/user/login",
        userData
      );
      localStorage.setItem("firstLogin", true); // Store login state in localStorage
      //   console.log(localStorage.getItem("firstLogin"));
      //   console.log("jhskhkjshkjhhhhhhhh");
      return res.data;
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
      const res = await axios.get("http://localhost:8000/user/infor", {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch user");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await axios.get("http://localhost:8000/user/logout");
  localStorage.removeItem("firstLogin");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    // user: (() => {
    //   const userData = localStorage.getItem("user");
    //   return userData ? JSON.parse(userData) : null; // Safely parse or return null
    // })(),
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
        state.user = {
          ...action.payload.user,
          accesstoken: action.payload.accesstoken,
        };
        localStorage.setItem("accesstoken", action.payload.accesstoken);
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
