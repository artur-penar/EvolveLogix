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

  // Regular expression to match numbers with one decimal place ending in 0 or 5, or integers
  const regex = /^\d+(\.\d{1})?$/;
  const isValid =
    regex.test(value) &&
    (value.endsWith("0") || value.endsWith("5") || !value.includes("."));

  // Allow empty value for backspace handling
  if (value === "" || (value >= 0 && value < 501 && isValid)) {
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
