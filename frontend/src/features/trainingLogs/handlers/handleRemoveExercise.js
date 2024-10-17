/**
 * Handles the removal of an exercise from the training data.
 *
 * This function updates the training data state by removing an exercise
 * at the specified index. It filters out the exercise from the list of
 * exercises and updates the state with the new list.
 *
 * @param {number} exerciseIndexToRemove - The index of the exercise to remove.
 * @param {Object} trainingData - The current state of the training data.
 * @param {Function} setTrainingData - The state setter function to update the training data.
 *
 * The function ensures that the exercise at the specified index is removed
 * from the list of exercises in the training data.
 */
const handleRemoveExercise = (
  exerciseIndexToRemove,
  trainingData,
  setTrainingData
) => {
  setTrainingData({
    ...trainingData,
    exercises: trainingData.exercises.filter(
      (exercise, index) => index !== exerciseIndexToRemove
    ),
  });
};

export default handleRemoveExercise;
