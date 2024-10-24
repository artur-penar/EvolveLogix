/**
 * Calculate the total repetitions for an exercise
 * @param {Object} exercise
 * @returns {number} - The total number of repetitions for the exercise
 */

const calculateTotalRepetitions = (exercise) => {
  return exercise.sets.reduce((totalRepetitions, set) => {
    return totalRepetitions + parseInt(set.repetitions, 10);
  }, 0);
};

export default calculateTotalRepetitions;
