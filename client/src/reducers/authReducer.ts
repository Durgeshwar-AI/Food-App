// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Remove refreshToken cookie (client attempt; server also clears httpOnly cookie)
      Cookies.remove("refreshToken", { path: "/" });
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
