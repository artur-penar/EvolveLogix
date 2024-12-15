import { useState } from "react";

/**
 * Custom hook to manage indices of exercise records.
 *
 * @param {Object} exerciseRecords - An object where keys are exercise names and values are arrays of records.
 * @returns {Object} - An object containing:
 *   - {Object} initialRecordIndices: Initial indices of the last record for each exercise.
 *   - {Object} currentRecordIndices: Current indices of the records for each exercise.
 *   - {Function} handlePrev: Function to decrement the index of the specified exercise.
 *   - {Function} handleNext: Function to increment the index of the specified exercise.
 */
const useRecordIndices = (exerciseRecords) => {
  const initialRecordIndices = Object.fromEntries(
    Object.entries(exerciseRecords).map(([key, data]) => [key, data.length - 1])
  );

  const [currentRecordIndices, setCurrentRecordIndices] =
    useState(initialRecordIndices);

  const handlePrev = (exerciseName) => {
    setCurrentRecordIndices((prevState) => ({
      ...prevState,
      [exerciseName]: (prevState[exerciseName] || 0) - 1,
    }));
  };

  const handleNext = (exerciseName) => {
    setCurrentRecordIndices((prevState) => ({
      ...prevState,
      [exerciseName]: (prevState[exerciseName] || 0) + 1,
    }));
  };

  return {
    initialRecordIndices,
    currentRecordIndices,
    handlePrev,
    handleNext,
  };
};

export default useRecordIndices;
