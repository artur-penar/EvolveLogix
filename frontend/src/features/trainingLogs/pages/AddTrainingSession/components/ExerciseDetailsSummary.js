import calculateAverageIntensity from "features/trainingLogs/utils/calculateAverageIntensity";
import calculateTotalRepetitions from "features/trainingLogs/utils/calculateTotalRepetitions";
import calculateTotalVolume from "features/trainingLogs/utils/calculateTotalVolume";
import React from "react";

/**
 * Component to display a summary of exercise details.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.exercise - The exercise data.
 * @param {Object} props.strengthRecords - The strength records data.
 *
 * @returns {JSX.Element} A JSX element displaying exercise details summary.
 */
const ExerciseDetailsSummary = ({ exercise, strengthRecords }) => {
  const volume = calculateTotalVolume(exercise);
  const averageIntensity = calculateAverageIntensity({
    exercise,
    strengthRecord: strengthRecords[exercise.exercise],
  });
  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Exercise Details</p>
      <p>Exercise volume: {volume}kg</p>
      {averageIntensity !== null && averageIntensity !== undefined && (
        <p>Average intensity: {averageIntensity}%</p>
      )}
      <p>Total repetitions: {calculateTotalRepetitions(exercise)}</p>
    </div>
  );
};
export default ExerciseDetailsSummary;
