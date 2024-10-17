/**
 * Adds a new exercise to the training data.
 *
 * This function updates the training data state by adding a new exercise
 * to the list of exercises. The new exercise is initialized with default
 * values for weight, repetitions, and set number.
 *
 * @param {Object} trainingData - The current state of the training data.
 * @param {Function} setTrainingData - The state setter function to update the training data.
 *
 * The new exercise added will have the following structure:
 * {
 *   exercise: "Squat",
 *   sets: [{ weight: 0, repetitions: 0, set_number: 1 }]
 * }
 */

const handleAddExercise = (trainingData, setTrainingData) => {
  setTrainingData({
    ...trainingData,
    exercises: [
      ...trainingData.exercises,
      {
        exercise: "Squat",
        sets: [{ weight: 0, repetitions: 0, set_number: 1 }],
      },
    ],
  });
};
export default handleAddExercise;
