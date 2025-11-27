import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import examReducer from "../features/exam/examSlice";

// ✅ Load saved user/token from localStorage
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const tokenFromStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

// ✅ Preloaded state for Redux (keeps user logged in)
const preloadedState = {
  auth: {
    user: userFromStorage,
    token: tokenFromStorage,
    isAuthenticated: !!userFromStorage && !!tokenFromStorage,
    loading: false,
    error: null,
    message: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    exam: examReducer,
  },
  preloadedState,
});

export default store;
