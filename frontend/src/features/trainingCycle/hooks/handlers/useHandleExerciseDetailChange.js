/**
 * Custom hook to handle changing the details of an exercise in a specific microcycle.
 *
 * @param {Function} setPhaseTrainingProgram - Function to update the phase training program state.
 * @returns {Function} handleExerciseDetailChange - Function to change a specific detail of an exercise in a specified microcycle.
 *
 * The handleExerciseDetailChange function takes five arguments:
 * - trainingSessionIndex: Index of the training session containing the exercise to be changed.
 * - exerciseIndex: Index of the exercise to be changed within the specified training session.
 * - microcycleIndex: Index of the microcycle containing the detail to be changed.
 * - newValue: New value for the specified detail.
 * - detailType: Type of detail to be changed (e.g., 'reps', 'sets', 'weight').
 *
 * The function creates a deep copy of the current phase training program state,
 * updates the specified detail of the exercise in the specified microcycle,
 * and then updates the phase training program state with the new state.
 */
const useHandleExerciseDetailChange = (setPhaseTrainingProgram) => {
  const handleExerciseDetailChange = (
    trainingSessionIndex,
    exerciseIndex,
    microcycleIndex,
    newValue,
    detailType
  ) => {
    setPhaseTrainingProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[trainingSessionIndex].exercises[exerciseIndex].microcycles[
        microcycleIndex
      ][detailType] = newValue;
      return newState;
    });
  };
  return handleExerciseDetailChange;
};

export default useHandleExerciseDetailChange;
