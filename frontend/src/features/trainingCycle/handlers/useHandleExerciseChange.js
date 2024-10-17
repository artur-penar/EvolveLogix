/**
 * Custom hook to handle changing the name of an exercise in a training session.
 *
 * @param {Function} setPhaseTrainingProgram - Function to update the phase training program state.
 * @returns {Function} handleExerciseChange - Function to change the name of an exercise in a specified training session.
 *
 * The handleExerciseChange function takes three arguments:
 * - trainingSessionIndex: Index of the training session containing the exercise to be changed.
 * - exerciseIndex: Index of the exercise to be changed within the specified training session.
 * - newExerciseName: New name for the exercise.
 *
 * The function creates a deep copy of the current phase training program state,
 * updates the name of the specified exercise, and then updates the phase training program state with the new state.
 */

const useHandleExerciseChange = (setPhaseTrainingProgram) => {
  const handleExerciseChange = (
    trainingSessionIndex,
    exerciseIndex,
    newExerciseName
  ) => {
    setPhaseTrainingProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      // Update the exercise name
      newState[trainingSessionIndex].exercises[exerciseIndex].exercise =
        newExerciseName;

      return newState;
    });
  };

  return handleExerciseChange;
};

export default useHandleExerciseChange;
