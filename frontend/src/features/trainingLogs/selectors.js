import { createSelector } from "reselect";

// Basic selector
export const selectExercises = (state) => state.exercises.exercises;

// Memoized selector
export const selectExerciseNames = createSelector(
  [selectExercises],
  (exercises) => exercises.map((exercise) => exercise.name)
);
