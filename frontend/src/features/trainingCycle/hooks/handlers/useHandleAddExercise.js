/**
 * Custom hook to handle adding a new exercise to a training session.
 *
 * @param {Function} setPhaseTrainingProgram - Function to update the phase training program state.
 * @param {Array} initialPhaseProgram - Initial phase program containing the structure of exercises.
 * @param {Function} setStateChanged - Function to update the state change counter.
 * @param {number} stateChanged - Current state change counter.
 * @returns {Function} handleAddExercise - Function to add a new exercise to a specified training session.
 *
 * The handleAddExercise function takes a trainingSessionIndex as an argument,
 * creates a deep copy of the current phase training program state, adds a new exercise
 * (based on the first exercise in the initialPhaseProgram) to the specified training session,
 * increments the state change counter, and updates the phase training program state with the new state.
 */

const useHandleAddExercise = (
  setPhaseTrainingProgram,
  initialPhaseProgram,
  setStateChanged,
  stateChanged
) => {
  const handleAddExercise = (trainingSessionIndex) => {
    setPhaseTrainingProgram((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      const newExercise = initialPhaseProgram[0].exercises[0];
      newState[trainingSessionIndex].exercises.push(newExercise);
      setStateChanged(stateChanged + 1);

      return newState;
    });
  };
  return handleAddExercise;
};

export default useHandleAddExercise;
