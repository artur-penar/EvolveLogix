import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/users/user";
import logReducer from "features/trainingLogs/log";
import exercisesReducer from "features/trainingLogs/exercises";
import strengthRecordSlice from "features/users/strengthRecordSlice";
import trainingCycleReducer from "features/trainingCycle/trainingCycle";

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
    trainingCycle: trainingCycleReducer,
    exercises: exercisesReducer,
    strengthRecords: strengthRecordSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
