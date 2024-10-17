/**
 * Handles the change in weight based on a percentage of a given weight.
 *
 * This function updates the training data state by calculating the new weight
 * based on the provided weight percentage and the given weight. It then updates
 * the specified set within the specified exercise with the new weight.
 *
 * @param {number} weightPercent - The percentage of the weight to be used.
 * @param {number} weight - The base weight to calculate the percentage from.
 * @param {number} targetExerciseIndex - The index of the exercise to update.
 * @param {number} targetSetIndex - The index of the set within the exercise to update.
 * @param {Object} trainingData - The current state of the training data.
 * @param {Function} setTrainingData - The state setter function to update the training data.
 *
 * The function calculates the new weight as (weightPercent / 100) * weight and updates
 * the specified set's weight with this new value.
 */
const handleWeightPercentageChange = (
  weightPercent,
  weight,
  targetExerciseIndex,
  targetSetIndex,
  trainingData,
  setTrainingData
) => {
  const newWeight = (weightPercent / 100) * weight;
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
                    weight: newWeight,
                  }
            ),
          }
    ),
  });
};

export default handleWeightPercentageChange;
