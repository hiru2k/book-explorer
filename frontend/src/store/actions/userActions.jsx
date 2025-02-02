import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apis/axiosInstance";
import { USER_API } from "../../apis/userApis";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(USER_API.REGISTER, userData);
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
      const res = await axiosInstance.post(USER_API.LOGIN, userData);
      const accessToken = res.data.accesstoken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("firstLogin", true);

      dispatch(fetchUser());

      return { accessToken };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(USER_API.FETCH_USER);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch user");
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await axiosInstance.get(USER_API.LOGOUT);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("firstLogin");
});
