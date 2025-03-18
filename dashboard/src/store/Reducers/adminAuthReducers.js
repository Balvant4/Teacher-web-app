import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ✅ Async thunk for admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (adminData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin/login", adminData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Async thunk for admin logout
export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin/logout", null, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ✅ Initial state
const initialState = {
  admin: null,
  isAuthenticated: !!localStorage.getItem("role"),
  loading: false,
  error: null,
  successMessage: null,
  logoutMessage: null,
  role: localStorage.getItem("role") || null,
};

// ✅ Admin authentication slice
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        Object.assign(state, {
          loading: true,
          error: null,
          successMessage: null,
        });
      })
      .addCase(adminLogin.fulfilled, (state, { payload }) => {
        const adminData = payload.data?.admin || null;
        const role = adminData?.role || "guest";

        localStorage.setItem("role", role);

        Object.assign(state, {
          loading: false,
          admin: adminData,
          role: role,
          isAuthenticated: true,
          successMessage: payload.message || "Login successful",
          error: null,
        });
      })
      .addCase(adminLogin.rejected, (state, { payload }) => {
        Object.assign(state, {
          loading: false,
          error: typeof payload === "string" ? payload : "An error occurred",
        });
      })

      // ✅ Handle Logout
      .addCase(adminLogout.fulfilled, (state, { payload }) => {
        localStorage.removeItem("role");

        Object.assign(state, {
          admin: null,
          role: null,
          isAuthenticated: false,
          loading: false,
          error: null,
          successMessage: null,
          logoutMessage: payload.message || "Logout successful",
        });
      })
      .addCase(adminLogout.rejected, (state, { payload }) => {
        Object.assign(state, {
          loading: false,
          error: typeof payload === "string" ? payload : "Logout failed",
        });
      });
  },
});

export default adminAuthSlice.reducer;
