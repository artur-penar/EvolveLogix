import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/users/user";
import logReducer from "features/trainingLogs/log";
import exercisesReducer from "features/trainingLogs/exercises";

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
    exercises: exercisesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
