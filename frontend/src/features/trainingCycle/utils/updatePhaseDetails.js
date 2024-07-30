// Helper functions
export const updateTrainingDays = (
  prevState,
  totalTrainingDays,
  initialExercises
) => {
  return Array.from({ length: totalTrainingDays }, (_, i) => {
    if (!prevState[i]) {
      return {
        dayNumber: i + 1,
        exercises: initialExercises,
      };
    } else {
      return prevState[i];
    }
  });
};

export const updateTrainingWeeks = (
  prevState,
  totalMicrocycles,
  newMicrocycleLoad
) => {
  return prevState.map((day) => {
    day.exercises = day.exercises.map((exercise) => {
      const currentMicrocyclesCount = exercise.microcycles.length;
      const microcyclesToAdd = totalMicrocycles - currentMicrocyclesCount;

      if (microcyclesToAdd > 0) {
        // Add the required number of microcycles
        return {
          ...exercise,
          microcycles: [
            ...exercise.microcycles,
            ...Array(microcyclesToAdd).fill(newMicrocycleLoad),
          ],
        };
      } else if (microcyclesToAdd < 0) {
        // Trim the microcycles to the new total
        return {
          ...exercise,
          microcycles: exercise.microcycles.slice(0, totalMicrocycles),
        };
      } else {
        // No change needed
        return exercise;
      }
    });

    return day;
  });
};
