import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/users/user";
import logReducer from "features/trainingLogs/log";

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
