/**
 * Handles the change in the completion status of a set within an exercise.
 *
 * This function updates the training data state by modifying the completion status
 * (is_completed) of a specific set within a specified exercise based on the user's input.
 *
 * @param {Object} e - The event object from the checkbox change.
 * @param {number} exerciseIndex - The index of the exercise to update.
 * @param {number} setIndex - The index of the set within the exercise to update.
 * @param {Object} trainingData - The current state of the training data.
 * @param {Function} setTrainingData - The state setter function to update the training data.
 *
 * The function updates the specified set's is_completed property with the new value
 * from the checkbox input.
 */
const handleCheckboxChange = (
  e,
  exerciseIndex,
  setIndex,
  trainingData,
  setTrainingData
) => {
  const newIsCompleted = e.target.checked;
  setTrainingData({
    ...trainingData,
    exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
      currentExerciseIndex !== exerciseIndex
        ? exercise
        : {
            ...exercise,
            sets: exercise.sets.map((set, currentSetIndex) =>
              currentSetIndex !== setIndex
                ? set
                : {
                    ...set,
                    is_completed: newIsCompleted,
                  }
            ),
          }
    ),
  });
};

export default handleCheckboxChange;
