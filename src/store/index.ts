// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    user: userReducer,
    messages: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
