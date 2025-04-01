import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./Reducers/adminAuthReducers";
import teacherAuthReducer from "./Reducers/teacherAuthReducers"; // Import teacherAuthReducer

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    teacherAuth: teacherAuthReducer, // Corrected key and assigned reducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
