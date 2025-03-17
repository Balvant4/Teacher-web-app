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
      return data; // Return full API response
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
      return rejectWithValue(error.response?.data?.message || "Logout");
    }
  }
);

// ✅ Initial state
const initialState = {
  admin: null,
  loading: false,
  error: null,
  successMessage: null,
  logoutMessage: null,
};

// ✅ Admin authentication slice
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {}, // No extra reducers needed
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
        Object.assign(state, {
          loading: false,
          admin: payload.data?.admin || null,
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

      //For Logout funclity
      .addCase(adminLogout.pending, (state) => {
        Object.assign(state, {
          loading: true,
          error: null,
        });
      })
      .addCase(adminLogout.fulfilled, (state, { payload }) => {
        Object.assign(state, {
          admin: null,
          loading: false,
          error: null,
          logoutMessage: payload.message || "Logout",
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
