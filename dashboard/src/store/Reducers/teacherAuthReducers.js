import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Async Thunk for Teacher Login
export const teacherLogin = createAsyncThunk(
  "teacher/login",
  async (teacherdata, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/teacher/login", teacherdata, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const teacherRegister = createAsyncThunk(
  "teacher/register",
  async (teacherdata, { rejectWithValue }) => {
    try {
      console.log("Registering Teacher Data:", teacherdata); // Debugging

      const { data } = await api.post("/auth/teacher/register", teacherdata, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.error("Registration Error:", error.response?.data); // Debugging
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Initial State
const initialState = {
  teacher: null,
  loading: false,
  error: null,
  successMessage: null,
  logoutMessage: null,
};

// Teacher Auth Slice
const teacherAuthSlice = createSlice({
  name: "teacherAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(teacherLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(teacherLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teacher = payload.data?.teacher || null; // Assuming API response contains `teacher`
        state.successMessage = payload.message || "Login successful";
        state.error = null;
      })
      .addCase(teacherLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          typeof payload === "string" ? payload : "An error occurred";
      })

      .addCase(teacherRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(teacherRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.teacher = payload.data?.teacher || null; // Assuming API response contains `teacher`
        state.successMessage = payload.message || "Login successful";
        state.error = null;
      })
      .addCase(teacherRegister.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          typeof payload === "string" ? payload : "An error occurred";
      });
  },
});

// Export actions and reducer
export const { logoutTeacher } = teacherAuthSlice.actions;
export default teacherAuthSlice.reducer;
