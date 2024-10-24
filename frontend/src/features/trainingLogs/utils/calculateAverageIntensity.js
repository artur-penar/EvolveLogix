/**
 * Calculates the average intensity of an exercise based on the strength record.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.exercise - The exercise object containing sets.
 * @param {Object} params.strengthRecord - The strength record object containing weight.
 * @returns {number|null} - The average intensity as a percentage, or null if no strength record is found.
 */

const calculateAverageIntensity = ({ exercise, strengthRecord }) => {
  let summaryIntensity = 0;
  let totalSets = 0;

  if (!strengthRecord) {
    // Return null if no strength record is found
    // When no record is found, the average intensity cannot be calculated
    return;
  }
  exercise.sets.forEach((set) => {
    const percentage = Math.round((set.weight / strengthRecord.weight) * 100);
    summaryIntensity += percentage;
    totalSets += 1;
  });

  const averageIntensity = summaryIntensity / totalSets;
  return averageIntensity;
};

export default calculateAverageIntensity;
