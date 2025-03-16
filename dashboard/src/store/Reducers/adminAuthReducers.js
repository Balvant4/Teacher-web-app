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

// ✅ Initial state
const initialState = {
  admin: null,
  loading: false,
  error: null,
  successMessage: null,
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
      });
  },
});

export default adminAuthSlice.reducer;
