/**
 * Handles the change in the number of sets for a specific exercise.
 *
 * This function updates the training data state by adjusting the number of sets
 * for a specified exercise based on the user's input. If the new number of sets
 * is greater than the current number, new sets with default values are added.
 * If the new number of sets is less, the excess sets are removed.
 *
 * @param {Object} e - The event object from the input change.
 * @param {number} targetExerciseIndex - The index of the exercise to update.
 * @param {Object} trainingData - The current state of the training data.
 * @param {Function} setTrainingData - The state setter function to update the training data.
 */
const handleSetsNumberChange = (
  e,
  targetExerciseIndex,
  trainingData,
  setTrainingData
) => {
  const updateSets = (exercise, newSetsNumber) => {
    const newSets = [...exercise.sets];

    if (newSetsNumber >= 0)
      if (newSetsNumber < newSets.length) {
        newSets.length = newSetsNumber;
      } else {
        while (newSets.length < newSetsNumber) {
          newSets.push({
            weight: 0,
            repetitions: 0,
            set_number: newSets.length + 1,
          });
        }
      }
    return newSets;
  };

  const newSetsNumber = parseInt(e.target.value, 10);
  setTrainingData({
    ...trainingData,
    exercises: trainingData.exercises.map((exercise, currentExerciseIndex) =>
      currentExerciseIndex !== targetExerciseIndex
        ? exercise
        : {
            ...exercise,
            sets: updateSets(exercise, newSetsNumber),
          }
    ),
  });
};

export default handleSetsNumberChange;
