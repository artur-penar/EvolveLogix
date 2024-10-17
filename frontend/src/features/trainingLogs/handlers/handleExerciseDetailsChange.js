/**
 * Handles the change in exercise details for a specific set within a specific exercise.
 *
 * This function updates the training data state by modifying the details of a specific set
 * within a specified exercise based on the user's input. The function ensures that the value
 * being set is non-negative before updating the state.
 *
 * @param {Object} e - The event object from the input change.
 * @param {number} targetExerciseIndex - The index of the exercise to update.
 * @param {number} targetSetIndex - The index of the set within the exercise to update.
 * @param {Object} trainingData - The current state of the training data.
 * @param {Function} setTrainingData - The state setter function to update the training data.
 *
 * The function updates the specified set's property (e.g., weight, repetitions) with the new value.
 * The structure of the updated set will be:
 * {
 *   ...set,
 *   [name]: value
 * }
 */
const handleExerciseDetailsChange = (
  e,
  targetExerciseIndex,
  targetSetIndex,
  trainingData,
  setTrainingData
) => {
  const { name, value } = e.target;
  if (value >= 0) {
    setTrainingData({
      ...trainingData,
      exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
        currentExerciseIndex !== targetExerciseIndex
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set, currentSetIndex) =>
                currentSetIndex !== targetSetIndex
                  ? set
                  : {
                      ...set,
                      [name]: value,
                    }
              ),
            }
      ),
    });
  }
};

export default handleExerciseDetailsChange;
