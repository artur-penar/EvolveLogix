import { useState } from "react";

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
